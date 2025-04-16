import React from "react";
import styles from "./Header.module.scss";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router";
export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div onClick={() => navigate("/admin")} className={styles.logo}>
            <FaApple className={styles.icon} />
          </div>
          <ul className={styles.navList}>
            <p onClick={() => navigate("/home")}>
              <li className={styles.navItem}>Store</li>
            </p>
            <li className={styles.navItem}>Mac</li>
            <li className={styles.navItem}>iPad</li>
            <li className={styles.navItem}>iPhone</li>
            <li className={styles.navItem}>Watch</li>
            <li className={styles.navItem}>Vision</li>
            <li className={styles.navItem}>AirPods</li>
            <li className={styles.navItem}>TV & Home</li>
            <li className={styles.navItem}>Entertainment</li>
            <li className={styles.navItem}>Accessories</li>
            <li className={styles.navItem}>Support</li>
          </ul>
          <div className={styles.actions}>
            <FiSearch className={styles.icon} />
            <FiShoppingBag className={styles.icon} />
          </div>
        </nav>
      </div>
    </header>
  );
};
