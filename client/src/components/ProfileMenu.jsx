import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import userIcon from "../assets/react.svg"; // replace with your own icon if needed
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen((prev) => !prev);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="profile-menu">
      {/* Profile button */}
      <button onClick={toggleMenu} className="profile-button">
        <img className="user-icon" src={userIcon} alt="User" />
        <span className="username">{user || "Profile"}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="profile-dropdown">
          <div className="dropdown-header">{user || "Guest"}</div>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
