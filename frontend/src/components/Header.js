import React from "react";
import logo from "../image/logo.svg";
import { Link,Route, Routes } from "react-router-dom";

function Header(props) {
  const newPath =
    props.path === "/" || props.path === "/signup" ? "/signin" : "/signup";
  const linkName = {
    "/": "Выйти",
    "/signup": "Войти",
    "/signin": "Регистрация",
  };
  const handleLogout = () => {
    props.onLogout();
  };
  console.log(props.path);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта Mesto" />
      <Routes>
      <Route path="/"
  
  element={
    <div className="header__menu">
      <a className="header__link header__link_mail">{props.userEmail}</a>
      <Link
        className="header__link header__link_exit"
        to={newPath}
        onClick={handleLogout}
      >
        {linkName[props.path]}
      </Link>
    </div>
  }
/>
<Route path="/signin"
element ={
  <div className="header__menu">
      <a className="header__link header__link_mail">{props.userEmail}</a>
  <Link className="header__link" to={newPath}> 

          {linkName[props.path]} 

        </Link> 
        </div>
}
/>
</Routes>
    </header>
  );
}

export default Header;
