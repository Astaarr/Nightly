import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../core/config/axios";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../../../core/context/NotificationContext";

export const useAuthForm = (isLogin = true) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Utilidades
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClassName = (fieldName) => {
    return `auth-form__input ${
      errorField === fieldName ? "auth-form__input--error" : ""
    }`;
  };

  const getMessageClassName = () => {
    return `auth-form__message ${
      isSuccess ? "auth-form__message--success" : ""
    }`;
  };

  // Validación del formulario
  const validateForm = () => {
    if (!email) {
      setMessage("El correo es obligatorio");
      setErrorField("email");
      return false;
    }

    if (!validateEmail(email)) {
      setMessage("Por favor, introduce un correo válido");
      setErrorField("email");
      return false;
    }

    if (!password) {
      setMessage("La contraseña es obligatoria");
      setErrorField("password");
      return false;
    }

    if (!isLogin) {
      if (!nombre) {
        setMessage("El nombre es obligatorio");
        setErrorField("nombre");
        return false;
      }

      if (!fecha_nacimiento) {
        setMessage("La fecha de nacimiento es obligatoria");
        setErrorField("fecha_nacimiento");
        return false;
      }

      const today = new Date();
      const birthDate = new Date(fecha_nacimiento);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 13) {
        setMessage("Debes tener al menos 13 años para registrarte");
        setErrorField("fecha_nacimiento");
        return false;
      }
    }

    setMessage("");
    setErrorField("");
    return true;
  };

  // Envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin
        ? { email, password }
        : { nombre, email, password, fecha_nacimiento };

      const response = await api.post(`/auth${endpoint}`, payload);

      if (isLogin) {
        const { token, user } = response.data;
        login(token, user);
        showNotification(`¡Bienvenido/a ${user.nombre}! Nos alegra verte de nuevo.`);
        navigate("/places");
      } else {
        setMessage(response.data.message);
        setIsSuccess(true);
        showNotification("¡Registro exitoso! Te hemos enviado un correo de bienvenida.");
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en la operación");
      setIsSuccess(false);
    }
  };

  return {
    // Estados
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    fecha_nacimiento,
    setFechaNacimiento,
    message,
    errorField,
    isSuccess,
    showPassword,
    
    // Funciones
    togglePasswordVisibility,
    handleSubmit,
    getInputClassName,
    getMessageClassName,
  };
}; 