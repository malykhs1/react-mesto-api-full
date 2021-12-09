import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ email, onSignOut }) => {
  return (
    <header className="header section">
      <img src={logo} alt="Место" className="header__logo" />
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button
            type="button"
            onClick={onSignOut}
            className="header__sign-out"
          >
            Выйти
          </button>
        </div>
      </Route>
      <Route exact path="/sign-in">
        <Link className="header__link" to="sign-up">
          Регистрация
        </Link>
      </Route>
      <Route exact path="/sign-up">
        <Link className="header__link" to="sign-in">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
