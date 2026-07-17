import { useEffect, useState } from "react";
import { fetchMyOwnProfile } from "../services/UserProfileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await fetchMyOwnProfile();

      setProfile(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    loadProfile,
    setProfile,
  };
};
