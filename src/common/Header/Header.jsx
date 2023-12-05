import "./Header.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/firebaseOperation";
import { ButtonNav } from "../ButtoNav/ButtonNav";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { searchMoviesAndTVShows } from "../../api/apiCalls";
import { SearchResultContext } from "../../context/SearchResultContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  //Login
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { currentUser } = useContext(AuthContext);

  //Scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  //Input & Search
  const [inputSearch, setInputSearch] = useState("");
  const { insertSearchResult } = useContext(SearchResultContext);
  const navigate = useNavigate("");

  const changeHandler = (event) => {
    const newResult = event.target.value;
    if (newResult.startsWith(" ")) {
      return;
    }
    setInputSearch(newResult);
  };

  const getData = async () => {
    console.log("Getting data");
    const response = await searchMoviesAndTVShows(inputSearch);
    insertSearchResult(response);
    navigate("/movies");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getData();
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
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
      <div className="flex gap-4 basis-1/3">
        <ButtonNav name={"Inicio"} destination={"/"} />
        <ButtonNav name={"Movies"} destination={"/movies"} />
        <ButtonNav name={"Series"} destination={"/series"} />
        {currentUser && (
          <ButtonNav name={"Your List"} destination={"/yourlist"} />
        )}
      </div>

      <div className="flex gap-2 basis-1/3 justify-center">
        <input
          className="p-2 rounded text-black"
          placeholder="Buscar película/serie"
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          value={inputSearch}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={getData}
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-4 basis-1/3 justify-end">
        {/* Condicionales para Login, Register, Logout */}
        {currentUser ? (
          <span className="text-white">{currentUser.email}</span>
        ) : null}
        <div className="relative">
          {/* Icon del dropwdown */}
          <span
            className="material-icons w-8 h-8 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {"person_outline"}
          </span>
          {/* Menú desplegable */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              {!currentUser && (
                <>
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </div>
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </div>
                </>
              )}
              {currentUser && (
                <div
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
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
