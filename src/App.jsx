import { useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductFormModal from "./components/ProductFormModal";
import DeleteModal from "./components/DeleteModal";

const initialProducts = [
  { id: 1, name: "Pulpen", price: 5000 },
  { id: 2, name: "Buku Tulis", price: 12000 },
  { id: 3, name: "Spidol", price: 8000 },
  { id: 4, name: "Penggaris", price: 6000 },
  { id: 5, name: "Penghapus", price: 3000 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [nextId, setNextId] = useState(6);

  // modal: null (tutup), "add", "edit", atau "delete"
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setSelected(null);
    setModal("add");
  }

  function openEdit(product) {
    setSelected(product);
    setModal("edit");
  }

  function openDelete(product) {
    setSelected(product);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
  }

  function handleAdd(name, price) {
    setProducts([...products, { id: nextId, name, price }]);
    setNextId(nextId + 1);
    closeModal();
  }

  function handleEdit(name, price) {
    setProducts(
      products.map((p) => (p.id === selected.id ? { ...p, name, price } : p))
    );
    closeModal();
  }

  function handleDelete() {
    setProducts(products.filter((p) => p.id !== selected.id));
    closeModal();
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          + Tambah Produk
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16" y2="16" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="count">{products.length} produk</span>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      <p className="footer">
        Menampilkan {filtered.length} dari {products.length} produk
      </p>

      {modal === "add" && (
        <ProductFormModal
          title="Tambah Produk"
          subtitle="Masukkan informasi produk baru."
          submitText="Simpan Produk"
          onSubmit={handleAdd}
          onClose={closeModal}
        />
      )}

      {modal === "edit" && (
        <ProductFormModal
          title="Edit Produk"
          subtitle="Perbarui informasi produk yang dipilih."
          submitText="Simpan Perubahan"
          product={selected}
          onSubmit={handleEdit}
          onClose={closeModal}
        />
      )}

      {modal === "delete" && (
        <DeleteModal
          product={selected}
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;