export default function Navbar({ title, onLogout }) {
  return (
    <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-600">{title}</h1>
      <button
        onClick={onLogout}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}
