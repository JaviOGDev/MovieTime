import "./Header.css";
import { useState, useContext, useEffect, useRef } from "react";
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
  const [inputSearch, setInputSearch] = useState(""); //Value of input
  const { insertSearchResult } = useContext(SearchResultContext); //Context
  const [searchResults, setSearchResults] = useState([]); //List of results
  const oldInputSearch = useRef(""); //To save latest inputSearch
  const navigate = useNavigate("");

  //Clickar fuera y no mostrar lista
  // const modalRef = useRef(null);

  const changeHandler = (event) => {
    setInputSearch(event.target.value);
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const inputValue = inputSearch.trim();
      if (inputValue && oldInputSearch.current !== inputValue) {
        getData(inputSearch);
        oldInputSearch.current = inputValue;
      } else {
        setSearchResults([]);
      }
    }, 450);

    return () => clearTimeout(debouncer);
  }, [inputSearch]);

  const getData = async (inputValue) => {
    if (inputValue.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await searchMoviesAndTVShows(inputValue);
      insertSearchResult(response);
      setSearchResults(response);
    } catch (error) {
      console.error("Error en la búsqueda", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate("/movies");
      setSearchResults([]);
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

  //Opcion para clickar fuera se vaya la lista
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       searchResults.length > 0 &&
  //       !modalRef.current.contains(event.target)
  //     ) {
  //       setSearchResults([]);
  //     }
  //   };

  //   window.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [searchResults]);

  return (
    <div
      className={`fixed w-full max-w-full top-0 z-50 flex justify-between items-center p-4 ${
        isScrolled ? "bg-opacity-50" : "bg-opacity-10"
      } bg-black`}
    >
      <div className="flex gap-4 basis-1/3">
        <ButtonNav name={"Inicio"} destination={"/"} />
        <ButtonNav name={"Movies"} destination={"/movies"} />
        {currentUser && (
          <ButtonNav name={"Your List"} destination={"/yourlist"} />
        )}
      </div>

      <div
        className="flex gap-2 basis-1/3 justify-center position-relative"
        // ref={modalRef}
      >
        <input
          className="p-2 rounded text-black"
          placeholder="Buscar película/serie"
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          value={inputSearch}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            setSearchResults([]);
            navigate("/movies");
          }}
        >
          Search
        </button>
        {searchResults.length > 0 ? (
          <div className="search-results-container">
            {searchResults.map((item, index) => {
              return (
                <div
                  key={index}
                  className="search-result-item text-black"
                  onClick={() => navigate(`/movie/${item.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  />
                  <p>{item.type === "movie" ? item.title : item.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
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
