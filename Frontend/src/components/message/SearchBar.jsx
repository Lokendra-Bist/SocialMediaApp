import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="Search users..."
      className="w-full rounded-lg border p-3 outline-none"
    />
  );
};
