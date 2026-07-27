import { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addRealtimeComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        addRealtimeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
