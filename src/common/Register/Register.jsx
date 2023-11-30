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
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      ref={modalRef}
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            className="p-2 rounded text-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded text-black"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.length > 0 && <p>{errors}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Registrar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
