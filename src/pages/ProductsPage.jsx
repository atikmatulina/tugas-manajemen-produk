import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import SearchBar from "../components/molecules/SearchBar";
import ProductList from "../components/organisms/ProductList";
import ProductFormModal from "../components/organisms/ProductFormModal";
import DeleteModal from "../components/organisms/DeleteModal";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productApi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // modal: null (tutup), "add", "edit", atau "delete"
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  // ambil data dari backend saat halaman pertama kali dibuka
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Gagal memuat produk. Pastikan backend sudah berjalan."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function openModal(type, product = null) {
    setSelected(product);
    setModal(type);
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
  }

  async function handleAdd(name, price) {
    const newProduct = await createProduct({ name, price });
    setProducts([...products, newProduct]);
    closeModal();
  }

  async function handleEdit(name, price) {
    const updated = await updateProduct(selected.id, { name, price });
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    closeModal();
  }

  async function handleDelete() {
    await deleteProduct(selected.id);
    setProducts(products.filter((p) => p.id !== selected.id));
    closeModal();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Manajemen Produk</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <Button onClick={() => openModal("add")}>+ Tambah Produk</Button>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <span className="text-sm text-gray-600">{products.length} produk</span>
      </div>

      {loading && <p className="py-6 text-gray-500">Memuat produk...</p>}
      {error && <p className="rounded-md bg-red-50 p-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <ProductList
            products={filtered}
            onEdit={(product) => openModal("edit", product)}
            onDelete={(product) => openModal("delete", product)}
          />
          <p className="mt-4 text-sm text-gray-600">
            Menampilkan {filtered.length} dari {products.length} produk
          </p>
        </>
      )}

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
        <DeleteModal product={selected} onConfirm={handleDelete} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProductsPage;
