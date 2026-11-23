import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProduct } from "../services/productApi";
import { formatPrice } from "../utils/formatPrice";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ambil data produk sesuai id di URL
  useEffect(() => {
    getProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto max-w-xl">
      <Link to="/products" className="text-sm font-semibold text-blue-700 hover:underline">
        ← Kembali ke daftar produk
      </Link>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {loading && <p className="text-gray-500">Memuat detail produk...</p>}

        {!loading && error && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Produk tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-500">
              Produk dengan ID <span className="font-semibold">{id}</span> tidak ada atau sudah
              dihapus.
            </p>
          </div>
        )}

        {!loading && product && (
          <>
            <p className="text-xs text-gray-500">ID: {product.id}</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-blue-700">{formatPrice(product.price)}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 text-sm">
              <div>
                <dt className="text-gray-500">ID Produk</dt>
                <dd className="font-semibold">{product.id}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Harga</dt>
                <dd className="font-semibold">{formatPrice(product.price)}</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
