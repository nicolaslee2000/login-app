import React, { useState } from "react";
import "./Header.css";
import { IconClose, IconHamburgerMenu, KSVLogo } from "../components/Icon/Icon";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Button from "../components/Button/Button";
import LoginButton from "../LoginTesting/LoginButton";
import Backdrop from "../LoginTesting/Backdrop";

const navItems = [
  { to: "aboutus", itemName: "About us" },
  { to: "notice", itemName: "Notice" },
  { to: "communities", itemName: "Communities" },
  { to: "jobposting", itemName: "Job posting" },
  { to: "donation", itemName: "Donation" },
  { to: "forum", itemName: "Forum" },
  { to: "post", itemName: "Post" },
];

const Header = () => {
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpened(!isMobileNavOpened);
  const navStyle = isMobileNavOpened ? `nav mobile-nav-visible` : `nav`;
  const closeMobileNav = () => setIsMobileNavOpened(false);
  const smoothEffect = isMobileNavOpened ? false : true;
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <Link
        to="/"
        style={{
          width: "auto",
          height: "100%",
          display: "inline-block",
          objectFit: "scale-down",
          marginLeft: "1rem",
        }}
      >
        <img src={KSVLogo} className="logo" alt="KSV Aachen" />
      </Link>
      <nav className={navStyle}>
        <ul>
          {navItems.map((item) => {
            return (
              <li className="nav-item" key={`nav-item-link-${item.to}`}>
                <Link
                  className="nav-item-link"
                  to={item.to}
                  style={{
                    textDecoration: "none",
                    fontFamily: "Arial",
                    fontWeight: "normal",
                    color: "#676767",
                  }}
                >
                  {item.itemName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <Contacts> */}
      {user?.displayName ? (
        <Button onClick={handleSignOut} text="Log Out" />
      ) : (
        <LoginButton />
      )}

      <div className="mobile-nav">
        {!isMobileNavOpened ? (
          <img
            className="mobile-nav-hamburger"
            src={IconHamburgerMenu}
            alt="mobile menu icon"
            onClick={toggleMobileNav}
          />
        ) : (
          <img
            className="moblie-nav-close"
            src={IconClose}
            alt="mobile menu close icon"
            onClick={toggleMobileNav}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
