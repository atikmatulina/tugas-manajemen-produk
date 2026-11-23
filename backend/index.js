import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;
const DATA_FILE = "./data/products.json";

app.use(cors());
app.use(express.json());

function readProducts() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function saveProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

// cek nama dan harga, kembalikan pesan error atau null kalau valid
function validate(body) {
  if (!body.name || body.name.trim() === "") {
    return "Nama produk wajib diisi.";
  }
  if (!Number(body.price) || Number(body.price) <= 0) {
    return "Harga harus lebih dari 0.";
  }
  return null;
}

// GET semua produk
app.get("/api/products", (req, res) => {
  res.json(readProducts());
});

// GET satu produk berdasarkan id
app.get("/api/products/:id", (req, res) => {
  const product = readProducts().find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan." });
  }
  res.json(product);
});

// POST tambah produk
app.post("/api/products", (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const products = readProducts();
  // id baru = id terbesar + 1
  const maxId = Math.max(0, ...products.map((p) => p.id));
  const newProduct = {
    id: maxId + 1,
    name: req.body.name.trim(),
    price: Number(req.body.price),
  };

  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

// PUT edit produk
app.put("/api/products/:id", (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const products = readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan." });
  }

  products[index] = {
    ...products[index],
    name: req.body.name.trim(),
    price: Number(req.body.price),
  };
  saveProducts(products);
  res.json(products[index]);
});

// DELETE hapus produk
app.delete("/api/products/:id", (req, res) => {
  const products = readProducts();
  const exists = products.some((p) => p.id === Number(req.params.id));
  if (!exists) {
    return res.status(404).json({ message: "Produk tidak ditemukan." });
  }

  saveProducts(products.filter((p) => p.id !== Number(req.params.id)));
  res.json({ message: "Produk berhasil dihapus." });
});

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
