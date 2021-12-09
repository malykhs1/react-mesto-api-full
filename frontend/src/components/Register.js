import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onRegister({ email, password })
      .then(resetForm)
      .then(() => history.push("/sign-in"));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePaswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="register__container">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          className="register__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          id="password"
          className="register__input"
          name="password"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={handlePaswordChange}
        />
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__login-link"> Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
