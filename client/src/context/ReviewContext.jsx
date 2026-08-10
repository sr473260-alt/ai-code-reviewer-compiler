import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [review, setReview] = useState("");

  return (
    <ReviewContext.Provider value={{ review, setReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);