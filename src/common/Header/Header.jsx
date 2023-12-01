import "./Header.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/firebaseOperation";
import { ButtonNav } from "../ButtoNav/ButtonNav";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export function Header() {
  //Login
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { currentUser } = useContext(AuthContext);

  //Scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const searchHandler = () => {
    console.log("Searched");
  };
  // Control al hacer scroll para cambiar fondo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full max-w-full top-0 z-50 flex justify-between items-center p-4 ${
        isScrolled ? "bg-opacity-50" : "bg-opacity-10"
      } bg-black`}
    >
      <div className="flex gap-4">
        <ButtonNav name={"Inicio"} destination={"/"} />
        <ButtonNav name={"Movies"} destination={"/movies"} />
        <ButtonNav name={"Series"} destination={"/series"} />
        <ButtonNav name={"UserTest"} destination={"/usertest"} />
        <ButtonNav name={"Your List"} destination={"/yourlist"} />
      </div>

      <div className="flex gap-2">
        <input
          className="p-2 rounded text-black"
          placeholder="Buscar película/serie"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={searchHandler}
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Condicionales para Login, Register, Logout */}
        {currentUser ? (
          <span className="text-white">{currentUser.email}</span>
        ) : null}
        <div className="relative">
          {/* Icono del usuario que activa el menú desplegable */}
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Icon"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Menú desplegable */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              {!currentUser && (
                <>
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </div>
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </div>
                </>
              )}
              {currentUser && (
                <div
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales para Login y Register */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}
