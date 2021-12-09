import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email, password })
      .then(resetForm)
      .then(() => history.push("/"));
  };

  return (
    <div className="login__container">
      <h2 className="login__title">Вход</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          id="email"
          className="login__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
