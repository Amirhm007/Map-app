import React from "react";
function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-400 text-[17px] p-2 rounded-md"
    >
      {children}
    </button>
  );
}

export default Button;
