import { useState } from "react";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import { formatPrice } from "../../utils/formatPrice";

function DeleteModal({ product, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Hapus Produk?</h2>
        <p className="text-sm text-gray-500">Produk yang dihapus tidak dapat dikembalikan.</p>
      </div>

      <div className="my-5 rounded-lg border border-gray-200 p-4">
        <p className="text-xs text-gray-500">ID: {product.id}</p>
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-lg font-bold text-blue-700">{formatPrice(product.price)}</p>
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Batal
        </Button>
        <Button variant="danger" className="flex-1" onClick={handleConfirm} disabled={loading}>
          {loading ? "Menghapus..." : "Hapus Produk"}
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
