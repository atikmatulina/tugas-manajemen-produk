# Tugas Manajemen Produk

Aplikasi manajemen produk dengan frontend React (Vite, React Router, Tailwind CSS) dan backend Express.

## Struktur

```
backend/              -> REST API produk (Express), data disimpan di backend/data/products.json
src/
├── components/
│   ├── atoms/        -> Button, Input
│   ├── molecules/    -> FormField, SearchBar, ProductCard, Modal
│   ├── organisms/    -> Navbar, ProductList, ProductFormModal, DeleteModal
│   └── templates/    -> MainLayout
├── pages/            -> ProductsPage, ProductDetailPage, NotFoundPage
├── services/         -> productApi.js (fetch ke backend)
└── utils/            -> formatPrice.js
```

## Menjalankan Backend

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3000`.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /api/products | Ambil semua produk |
| GET | /api/products/:id | Ambil satu produk |
| POST | /api/products | Tambah produk |
| PUT | /api/products/:id | Edit produk |
| DELETE | /api/products/:id | Hapus produk |

## Menjalankan Frontend

Buka terminal baru di folder utama repository:

```bash
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`. Backend harus sudah berjalan lebih dulu.

## Halaman

- `/products`: daftar produk, tambah, edit, hapus, dan pencarian
- `/products/:id`: detail produk
- URL lain: halaman 404
