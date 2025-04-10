import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between text-gray-500 text-sm p-4">
      <p>© 2025 Invoase. All rights reserved. </p>
      <div className="flex gap-4">
        <a href="/">Help</a>
        <a href="/">Support</a>
        <a href="/">Privacy</a>
      </div>
    </div>
  );
};

export default Footer;
