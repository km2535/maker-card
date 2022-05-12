import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const navigate = useNavigate();
  const gotoMaker = (userid) => {
    navigate("/maker", { state: { id: userid } });
  };
  const onLogin = (e) => {
    //console.log(e.currentTarget.textContent);
    //console.log(e.target.innerText);
    authService
      .login(e.currentTarget.textContent)
      .then((data) => gotoMaker(data.user.uid));
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      user && gotoMaker(user.uid);
    });
  });
  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
