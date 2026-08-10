import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-lg bg-slate-800 dark:bg-slate-900">

      <h1 className="text-2xl font-bold text-white">
        AI Code Reviewer
      </h1>

      <button
        onClick={toggleTheme}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

    </nav>
  );
};

export default Navbar;