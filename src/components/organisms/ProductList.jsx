import ProductCard from "../molecules/ProductCard";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="py-6 text-gray-500">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;
