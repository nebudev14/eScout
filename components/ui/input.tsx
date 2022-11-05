import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      {...rest}
      className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
    />
  );
};
