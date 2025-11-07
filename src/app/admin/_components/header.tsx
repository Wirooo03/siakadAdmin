"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiUserCheck } from "react-icons/fi";
import Image from 'next/image';
import Link from 'next/link';
import { withAssetsBasePath } from '@/lib/util/basePathAsset';

interface HeaderProps {
  isSidebarOpen?: boolean;
  onToggle?: () => void;
  title?: React.ReactNode;
}

export default function Header({ isSidebarOpen = true, onToggle, title }: HeaderProps) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find closest scrollable ancestor (usually the main with overflow-auto).
    const findScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
      let node = el?.parentElement || null;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
          return node;
        }
        node = node.parentElement;
      }
      // fallback to window
      return window;
    };

    const scrollParent = findScrollParent(headerRef.current);

    // Initialize lastY to current scroll position of the scroll parent
    lastY.current = scrollParent === window ? window.scrollY || 0 : (scrollParent as HTMLElement).scrollTop || 0;

    // shared processor using rAF
    // show/hide strictly based on scroll direction: hide on scroll down, show on scroll up
    // We use a slightly larger threshold and require the page to be scrolled a bit
    // (80px) before hiding to avoid jitter when the user is near the top.
    const processScroll = (currentY: number) => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY.current;
          // stable threshold to avoid jitter
          const THRESHOLD = 10;
          const MIN_SCROLL_TO_HIDE = 80;

          if (Math.abs(delta) > THRESHOLD) {
            if (delta > 0 && currentY > MIN_SCROLL_TO_HIDE) {
              // scrolling down and past minimum offset -> hide
              setVisible(false);
            } else if (delta < 0) {
              // scrolling up -> show
              setVisible(true);
            }
          }

          // Always update lastY for next comparison
          lastY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Build a set of scroll targets: always include window, the determined scrollParent,
    // and any other elements on the page that are scrollable (overflow:auto/scroll).
    const scrollTargets = new Set<EventTarget>();
    scrollTargets.add(window);
    if (scrollParent && scrollParent !== window) scrollTargets.add(scrollParent as EventTarget);

    // Also probe common containers that may host scrolling
    const maybeMain = document.querySelector("main");
    if (maybeMain) scrollTargets.add(maybeMain);
    const nextRoot = document.getElementById("__next");
    if (nextRoot) scrollTargets.add(nextRoot);

    // Find any element with overflow:auto/scroll and overflowing content and add it
    try {
  const all = Array.from(document.querySelectorAll<HTMLElement>("*"));
      all.forEach((el) => {
        const cs = window.getComputedStyle(el);
        if ((cs.overflowY === "auto" || cs.overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          scrollTargets.add(el);
        }
      });
    } catch (e) {
      // If the DOM is restricted for some reason, ignore and continue with window/main
    }

    const handlers: Map<EventTarget, EventListener> = new Map();
    scrollTargets.forEach((t) => {
      const listener = () => {
        const currentY = t === window ? window.scrollY || 0 : (t as HTMLElement).scrollTop || 0;
        processScroll(currentY);
      };
      handlers.set(t, listener);
      t.addEventListener("scroll", listener as EventListener, { passive: true });
    });

    return () => {
      handlers.forEach((listener, t) => {
        try {
          t.removeEventListener("scroll", listener as EventListener);
        } catch (e) {
          // ignore
        }
      });
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`w-full bg-white/70 backdrop-blur-sm p-3 lg:hidden sticky top-0 z-40 transition-transform duration-200 shadow-sm ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile toggle sits inside the header so it doesn't overlap page content */}
          {onToggle && (
            <button
                onClick={onToggle}
                aria-label={isSidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
                title={isSidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
                className="p-2 bg-[var(--siakad-blue)] text-white rounded-md shadow-sm hover:brightness-110 transition-all duration-150"
              >
              {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          )}

          {/* Logo - clickable and redirects to dashboard */}
          <Link 
            href="/admin/dashboard"
            className="flex items-center gap-2 group hover:scale-105 transition-transform duration-200"
          >
            <div className="p-1 bg-transparent rounded-lg flex-shrink-0 flex items-center justify-center" style={{ width: 36, height: 36 }}>
              <Image
                src={withAssetsBasePath('/logo-uniman.png')}
                alt="Uniman Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                SIAKAD
              </h2>
            </div>
          </Link>
        </div>

        {/* Optional title placeholder - when present it won't be overlapped */}
        <div className="flex-1 px-3">
          {title ? <div className="text-sm font-semibold text-slate-700 text-center">{title}</div> : null}
        </div>

        {/* Profile button */}
        <Link
          href="/admin/profile"
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-indigo-50 transition-all duration-300 group hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
            <FiUserCheck className="text-white text-sm" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors truncate">
              Admin
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
