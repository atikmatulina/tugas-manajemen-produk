const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// fungsi bantu: kirim request lalu lempar error kalau response gagal
async function request(path, options = {}) {
  const res = await fetch(API_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }
  return data;
}

export function getProducts() {
  return request("/products");
}

export function getProduct(id) {
  return request(`/products/${id}`);
}

export function createProduct(product) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, { method: "DELETE" });
}
