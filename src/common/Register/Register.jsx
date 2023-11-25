import "./Register.css";
import { useEffect, useRef, useState } from "react";
import { registerUser } from "../../firebase/firebaseOperation";

export function Register({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState("");
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await registerUser(email, password);
      console.log("Usuario registrado con éxito");
      onClose();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setErrors(error.message);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.length > 0 && <p>{errors}</p>}
          <button type="submit">Registrar</button>
          <button onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
