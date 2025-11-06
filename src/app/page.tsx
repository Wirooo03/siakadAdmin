"use client";

import { useState } from "react";
import { useProdiTable } from "@/lib/hooks/data-kampus/perguruan-tinggi/prod/useProdTable";
import type { ProgramStudiItem } from "@/lib/services/data-kampus/pendidikan-tinggi/prod/type";

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [q, setQ] = useState<string>("");

  const { data, isLoading, error } = useProdiTable({ page, per_page: perPage, q });

    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">List Program Studi</h1>

        <div className="mb-4 flex items-center gap-3">
          <input
            type="search"
            placeholder="Cari nama prodi..."
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            className="border px-3 py-2 rounded w-64"
          />

          <label className="text-sm">Per halaman:</label>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="border px-2 py-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {isLoading && <div>Loading data...</div>}
        {error && <div className="text-red-600">Error: {error.message}</div>}

        {!isLoading && !error && (
          <div>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-3 py-2 text-left">Kode</th>
                  <th className="border px-3 py-2 text-left">Nama Prodi</th>
                  <th className="border px-3 py-2 text-left">Nama Singkat</th>
                  <th className="border px-3 py-2 text-left">Ketua</th>
                  <th className="border px-3 py-2 text-left">Fakultas</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((row: ProgramStudiItem) => (
                  <tr key={row.id_sms}>
                    <td className="border px-3 py-2">{row.kode}</td>
                    <td className="border px-3 py-2">{row.nama_prodi}</td>
                    <td className="border px-3 py-2">{row.nama_singkat}</td>
                    <td className="border px-3 py-2">{row.ketua_prodi ?? "-"}</td>
                    <td className="border px-3 py-2">{row.fakultas ?? "-"}</td>
                    <td className="border px-3 py-2">{row.status ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.pagination && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: data.pagination.last_page }, (_, i) => i + 1)
                  .slice(Math.max(0, page - 3), Math.min(data.pagination.last_page, page + 2))
                  .map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 border rounded ${p === page ? "bg-gray-200" : ""}`}
                    >
                      {p}
                    </button>
                  ))}

                <button
                  onClick={() => setPage((p) => Math.min(data.pagination.last_page, p + 1))}
                  disabled={page >= data.pagination.last_page}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>

                <div className="ml-3 text-sm">
                  Halaman {data.pagination.current_page} dari {data.pagination.last_page} — Total: {data.pagination.total}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

