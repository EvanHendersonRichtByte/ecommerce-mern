import React from "react";

const Footer = () => {
  const footer = {
  };
  return (
    <footer style={footer} className="navbar absolute-bottom bg-dark">
      <div className="col">
        <p className=" text-center text-white">
          Copyright © Kryptonite E-Commerce {new Date().getFullYear() + 5}
        </p>
      </div>
      {/* /.container */}
    </footer>
  );
};

export default Footer;
