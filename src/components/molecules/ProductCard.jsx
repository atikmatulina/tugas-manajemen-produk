import { Link } from "react-router";
import Button from "../atoms/Button";
import { formatPrice } from "../../utils/formatPrice";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500">ID: {product.id}</p>
      <Link
        to={`/products/${product.id}`}
        className="mt-1 block text-xl font-bold text-gray-900 hover:text-blue-700 hover:underline"
      >
        {product.name}
      </Link>
      <p className="mt-1 mb-3 text-xl font-bold text-blue-700">
        {formatPrice(product.price)}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="outlineDanger" className="flex-1" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
