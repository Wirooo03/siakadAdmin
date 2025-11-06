# Contoh Penggunaan Prodi Dropdown

## 1. Setup Environment Variable

Pastikan file `.env.local` Anda memiliki variabel:

```env
NEXT_PUBLIC_SIAKAD_URL=http://your-siakad-url
```

## 2. Penggunaan di Page.tsx (Client Component)

```tsx
"use client";

import { useState } from "react";
import ProdiDropdown from "@/components/prodi/ProdiDropdown";

export default function ExamplePage() {
  const [selectedProdi, setSelectedProdi] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Program Studi</h1>
      
      <ProdiDropdown
        value={selectedProdi}
        onChange={setSelectedProdi}
        placeholder="Pilih Program Studi"
        className="w-full px-4 py-2 border rounded-md"
      />

      {selectedProdi && (
        <p className="mt-4">
          Prodi terpilih: <strong>{selectedProdi}</strong>
        </p>
      )}
    </div>
  );
}
```

## 3. Penggunaan Hook Langsung (Tanpa Komponen)

```tsx
"use client";

import { useProdiDropdown } from "@/hooks/prodi/useProdi";

export default function CustomPage() {
  const { data, isLoading, error } = useProdiDropdown();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Daftar Program Studi:</h2>
      <ul>
        {data?.data.map((prodi) => (
          <li key={prodi.id_sms}>
            {prodi.nm_lemb} (ID: {prodi.id_sms})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 4. Penggunaan dengan Form

```tsx
"use client";

import { useState } from "react";
import { useProdiDropdown } from "@/hooks/prodi/useProdi";

export default function FormPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    id_prodi: "",
  });
  
  const { data: prodiData, isLoading } = useProdiDropdown();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Proses form data di sini
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Nama:</label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2">NIM:</label>
        <input
          type="text"
          value={formData.nim}
          onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2">Program Studi:</label>
        <select
          value={formData.id_prodi}
          onChange={(e) => setFormData({ ...formData, id_prodi: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          disabled={isLoading}
        >
          <option value="">Pilih Program Studi</option>
          {prodiData?.data.map((prodi) => (
            <option key={prodi.id_sms} value={prodi.id_sms}>
              {prodi.nm_lemb}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
```

## 5. Penggunaan dengan React Hook Form

```tsx
"use client";

import { useForm } from "react-hook-form";
import { useProdiDropdown } from "@/hooks/prodi/useProdi";

interface FormInputs {
  nama: string;
  nim: string;
  id_prodi: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const { data: prodiData, isLoading } = useProdiDropdown();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nama:</label>
        <input
          {...register("nama", { required: "Nama wajib diisi" })}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.nama && <span className="text-red-500">{errors.nama.message}</span>}
      </div>

      <div>
        <label>Program Studi:</label>
        <select
          {...register("id_prodi", { required: "Prodi wajib dipilih" })}
          className="w-full px-4 py-2 border rounded"
          disabled={isLoading}
        >
          <option value="">Pilih Program Studi</option>
          {prodiData?.data.map((prodi) => (
            <option key={prodi.id_sms} value={prodi.id_sms}>
              {prodi.nm_lemb}
            </option>
          ))}
        </select>
        {errors.id_prodi && <span className="text-red-500">{errors.id_prodi.message}</span>}
      </div>

      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
```

## Fitur yang Sudah Diimplementasikan

- ✅ TypeScript types untuk type safety
- ✅ React Query untuk caching dan state management
- ✅ Loading dan error handling
- ✅ Reusable dropdown component
- ✅ Stale time 5 menit (data fresh)
- ✅ Garbage collection 10 menit
- ✅ Automatic refetch on window focus (default React Query)

## Keuntungan Menggunakan React Query

1. **Caching**: Data di-cache otomatis, tidak perlu fetch ulang jika masih fresh
2. **Background Refetching**: Data di-refresh di background saat stale
3. **Error Retry**: Otomatis retry jika fetch gagal
4. **Deduplication**: Multiple komponen yang menggunakan query yang sama hanya fetch sekali
5. **Loading & Error States**: Built-in state management
