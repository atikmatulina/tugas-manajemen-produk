import { useState } from "react";

function ProductFormModal({ title, subtitle, submitText, product, onSubmit, onClose }) {
  // kalau mode edit, isi awal diambil dari product yang dipilih
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (Number(price) <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    onSubmit(name.trim(), Number(price));
  }

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <button type="button" className="close" onClick={onClose}>
          ×
        </button>
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>

        {product && <p className="card-id">ID: {product.id}</p>}

        <label>Nama Produk</label>
        <input
          type="text"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Harga (Rp)</label>
        <input
          type="number"
          placeholder="Contoh: 5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p className={error ? "hint error" : "hint"}>
          {error ? error : "Harga harus lebih dari 0."}
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormModal;