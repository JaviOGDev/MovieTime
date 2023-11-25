import "./Login.css";
import { useEffect, useRef, useState } from "react";
import { loginUser } from "../../firebase/firebaseOperation.js";

export function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log("Inicio de sesion existoso");
      onClose();
    } catch (error) {
      console.log("Error en inicio de sesioin; ", error);
    }
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => document.removeEventListener("mousedown", closeModal);
  }, []);

  return (
    <div className="login-overlay" ref={modalRef}>
      <div className="login-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
          <button onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
