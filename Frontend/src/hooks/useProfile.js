import { useEffect, useState } from "react";
import {
  fetchMyOwnProfile,
  uploadUserProfile,
} from "../services/UserProfileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateProfilePhotos = async (file) => {
    try {
      const response = await uploadUserProfile(file);
      console.log("Uploaded profile response: ", response.data);
    } catch (error) {
      console.error("Error uploading user profile:", error);
      throw error;
    }
  };

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
    updateProfilePhotos,
  };
};
