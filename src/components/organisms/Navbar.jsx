import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-blue-700">
          TokoKu
        </Link>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-sm font-semibold ${isActive ? "text-blue-700" : "text-gray-600 hover:text-blue-700"}`
          }
        >
          Daftar Produk
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
