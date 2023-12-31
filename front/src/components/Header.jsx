import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Movie Diary</h1>
      <button className={styles.add_btn}>
        <Link to="/add">ADD NEW MOVIE</Link>
      </button>
    </header>
  );
}

export default Header;
