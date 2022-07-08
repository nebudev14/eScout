import React from "react";

interface InputProps {
  children?: React.ReactNode;
  id?: string,
  placeholder?: string
  readonly: boolean,
}

export const Input: React.FC<InputProps> = ({
  children,
  id,
  readonly,
  placeholder
}) => {
  return (
    <input
      className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
      id={id}
      autoComplete="off"
      readOnly={readonly}
      placeholder={placeholder}
      required
    >
      {children}
    </input>
  );
};
