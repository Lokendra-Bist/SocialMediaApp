import { useState } from "react";
import { searchUsers } from "../services/UsersService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const search = async (text) => {
    if (!text.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const response = await searchUsers(text);
      console.log("Search Users: ", response.data);
      setUsers(response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    search,
  };
};
