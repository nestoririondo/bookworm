import { createContext, useState, useEffect } from "react";
import { SERVER_BASE_URL } from "../constants/server";
import axios from "axios";

export const BookContext = createContext();

export const Provider = ({ children }) => {
  const [myBooks, setMyBooks] = useState([]);

  const getMyBooks = async (user_id) => {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/myBooks`, {
        params: { user_id },
      });
      setMyBooks(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    const user_id = 1;
    getMyBooks(user_id);
  }, []);

  const value = {
    myBooks,
    setMyBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
