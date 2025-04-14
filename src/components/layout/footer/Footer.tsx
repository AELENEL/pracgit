import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {" "}
        <div className={styles.columns}>
          <div>
            <h4>Shop and Learn</h4>
            <ul>
              <li>Store</li>
              <li>Mac</li>
              <li>iPad</li>
              <li>iPhone</li>
              <li>Watch</li>
              <li>Vision</li>
              <li>AirPods</li>
              <li>TV & Home</li>
              <li>AirTag</li>
              <li>Accessories</li>
              <li>Gift Cards</li>
            </ul>
            <h4>Apple Wallet</h4>
            <ul>
              <li>Wallet</li>
              <li>Apple Card</li>
              <li>Apple Pay</li>
              <li>Apple Cash</li>
            </ul>
          </div>

          <div>
            <h4>Account</h4>
            <ul>
              <li>Manage Your Apple Account</li>
              <li>Apple Store Account</li>
              <li>iCloud.com</li>
            </ul>
            <h4>Entertainment</h4>
            <ul>
              <li>Apple One</li>
              <li>Apple TV+</li>
              <li>Apple Music</li>
              <li>Apple Arcade</li>
              <li>Apple Fitness+</li>
              <li>Apple News+</li>
              <li>Apple Podcasts</li>
              <li>Apple Books</li>
              <li>App Store</li>
            </ul>
          </div>

          <div>
            <h4>Apple Store</h4>
            <ul>
              <li>Find a Store</li>
              <li>Genius Bar</li>
              <li>Today at Apple</li>
              <li>Apple Camp</li>
              <li>Apple Store App</li>
              <li>Certified Refurbished</li>
              <li>Apple Trade In</li>
              <li>Financing</li>
              <li>Carrier Deals at Apple</li>
              <li>Find your Order - Apple</li>
              <li>Shopping Help</li>
            </ul>
          </div>

          <div>
            <h4>For Business</h4>
            <ul>
              <li>Apple and Business</li>
              <li>Shop for Business</li>
            </ul>
            <h4>For Education</h4>
            <ul>
              <li>Apple and Education</li>
              <li>Shop for K-12</li>
              <li>Shop for College</li>
            </ul>
            <h4>For Healthcare</h4>
            <ul>
              <li>Apple in Healthcare</li>
              <li>Health on Apple Watch</li>
              <li>Health Records on iPhone</li>
            </ul>
            <h4>For Government</h4>
            <ul>
              <li>Shop for Government</li>
              <li>Shop for Veterans and Military</li>
            </ul>
          </div>

          <div>
            <h4>Apple Values</h4>
            <ul>
              <li>Accessibility</li>
              <li>Education</li>
              <li>Environment</li>
              <li>Inclusion and Diversity</li>
              <li>Privacy</li>
              <li>Racial Equity and Justice</li>
              <li>Supply Chain</li>
            </ul>
            <h4>About Apple</h4>
            <ul>
              <li>Newsroom</li>
              <li>Apple Leadership</li>
              <li>Career Opportunities</li>
              <li>Investors</li>
              <li>Ethics & Compliance</li>
              <li>Events</li>
              <li>Contact Apple</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomNote}>
          <p>
            More ways to shop: <a href="#">Find an Apple Store</a> or{" "}
            <a href="#">other retailer</a> near you. Or call 1‑800‑MY‑APPLE.
          </p>
        </div>
        <div className={styles.bottomBar}>
          <p>Copyright © 2025 Apple Inc. All rights reserved.</p>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Sales and Refunds</li>
            <li>Legal</li>
            <li>Site Map</li>
          </ul>
          <p>United States</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
