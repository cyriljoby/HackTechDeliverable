import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// // Custom hook for easy access to the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes from the API
  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quote");
      if (!response.ok) throw new Error("Failed to fetch quotes.");
      const data = await response.json();
      console.log(data)
      setQuotes(data);
      console.log("Updated quotes state:", quotes); // This will show the previous state due to closure

    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

 

  // Context value
  const contextValue = {
    quotes,
    fetchQuotes
  };
  

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
