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
      setUsers(response.data.data);
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
