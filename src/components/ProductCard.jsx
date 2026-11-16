import { formatPrice } from "../formatPrice";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card">
      <p className="card-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="price">{formatPrice(product.price)}</p>
      <div className="card-actions">
        <button className="btn btn-outline" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn btn-outline-danger" onClick={() => onDelete(product)}>
          Hapus
        </button>
      </div>
    </div>
  );
}

export default ProductCard;