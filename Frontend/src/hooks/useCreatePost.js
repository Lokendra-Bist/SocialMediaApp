import { useState } from "react";
import toast from "react-hot-toast";
import { createPost } from "../services/PostsService";

export const useCreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleInputChange = (e) => {
    setContent(e.target.value);

    setErrors((prev) => ({ ...prev, content: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG, WEBP and GIF images are allowed.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must not exceed 5 MB.",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!content.trim() && !image) {
      tempErrors.content = "Write something or upload an image.";
    }

    if (content.length > 1000) {
      tempErrors.content = "Post cannot exceed 1000 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const postData = new FormData();
    postData.append("content", content);
    if (image) {
      postData.append("image", image);
    }

    try {
      setLoading(true);

      await createPost(postData);

      toast.success("Post created successfully!");
      setContent("");
      removeImage();
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create post.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    content,
    handleInputChange,
    handleImageChange,
    image,
    imagePreview,
    removeImage,
    handleSubmit,
    errors,
    loading,
  };
};
