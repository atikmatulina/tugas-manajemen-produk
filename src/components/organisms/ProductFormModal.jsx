import { useState } from "react";
import Modal from "../molecules/Modal";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

function ProductFormModal({ title, subtitle, submitText, product, onSubmit, onClose }) {
  // kalau mode edit, isi awal diambil dari product yang dipilih
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (Number(price) <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(name.trim(), Number(price));
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {product && <p className="mt-2 text-xs text-gray-500">ID: {product.id}</p>}
        </div>

        <FormField
          label="Nama Produk"
          type="text"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <FormField
            label="Harga (Rp)"
            type="number"
            placeholder="Contoh: 5000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-gray-500"}`}>
            {error ? error : "Harga harus lebih dari 0."}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Menyimpan..." : submitText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductFormModal;
