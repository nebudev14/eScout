import React from "react";

export const Input: React.FC<React.PropsWithChildren<{ id: string, placeholder: string }>> = ({
  children,
  id,
  placeholder
}) => {
  return (
    <input
      className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
      id={id}
      autoComplete="off"
      placeholder={placeholder}
    >
      {children}
    </input>
  );
};
