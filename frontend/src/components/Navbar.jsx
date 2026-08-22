import LibraryNodeBrand from "./LibraryNodeBrand";

function Navbar({ title }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <LibraryNodeBrand size="sm" />

        <span className="text-slate-600">
          {title}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;