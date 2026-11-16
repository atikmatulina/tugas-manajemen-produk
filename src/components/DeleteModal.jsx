import { formatPrice } from "../formatPrice";

function DeleteModal({ product, onConfirm, onClose }) {
  return (
    <div className="overlay">
      <div className="modal center">
        <button type="button" className="close" onClick={onClose}>
          ×
        </button>
        <div className="trash-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </div>
        <h2>Hapus Produk?</h2>
        <p className="subtitle">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="card preview">
          <p className="card-id">ID: {product.id}</p>
          <h3>{product.name}</h3>
          <p className="price">{formatPrice(product.price)}</p>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;