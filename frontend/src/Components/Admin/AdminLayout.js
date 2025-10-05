import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white shadow-md px-4 h-14">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden inline-flex items-center justify-center bg-transparent text-slate-900 rounded-md p-2"
            aria-label="Open sidebar"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h4 className="font-bold">Admin Dashboard</h4>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto bg-slate-900 text-slate-100 w-64 transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-white"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="mt-16 md:mt-6 px-4 space-y-4">
            <NavLink
              to="/admin/books"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 ${
                  isActive ? "bg-slate-800" : ""
                }`
              }
            >
              <BookOpen className="h-4 w-4" />
              <span>See All Books</span>
            </NavLink>

            <NavLink
              to="/admin/add-book"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 ${
                  isActive ? "bg-slate-800" : ""
                }`
              }
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Books</span>
            </NavLink>

            <NavLink
              to="/"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              <span>Return To Home Page</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64 bg-slate-50">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
