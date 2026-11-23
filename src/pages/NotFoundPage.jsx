import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-blue-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-gray-500">
        Halaman yang kamu cari tidak ada atau alamatnya salah.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Kembali ke Daftar Produk
      </Link>
    </div>
  );
}

export default NotFoundPage;
