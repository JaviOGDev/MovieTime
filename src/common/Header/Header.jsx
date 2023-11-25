import "./Header.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/firebaseOperation";
import { ButtonNav } from "../ButtoNav/ButtonNav";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="navigation-bar">
      <div className={`navigation-bar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navigation">
          <ButtonNav name={"Inicio"} destination={"/"} />
          <ButtonNav name={"Series"} destination={"/series"} />
          <ButtonNav name={"UserTest"} destination={"/usertest"} />
        </div>
        <div className="logginAndTheme">
          {currentUser ? (
            <>
              <span>{currentUser.email}</span>
              <div className="buttonLogginDesign" onClick={handleLogout}>
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="buttonLogginDesign"
                onClick={() => setShowLogin(true)}
              >
                Login
              </div>
              <div
                className="buttonRegisterDesign"
                onClick={() => setShowRegister(true)}
              >
                Register
              </div>
            </>
          )}
          <ThemeToggle />
        </div>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
        {showRegister && <Register onClose={() => setShowRegister(false)} />}
      </div>
    </div>
  );
}
