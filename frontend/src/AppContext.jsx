import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// // Custom hook for easy access to the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [range, setRange] = useState('all');

  // Fetch quotes from the API
  const fetchQuotes = async (range) => {
    try {
      console.log(range)
      const response = await fetch(`/api/quote?range=${range}`);
      if (!response.ok) throw new Error("Failed to fetch quotes.");
      const data = await response.json();
      console.log(data)
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleFilterChange = async (selectedRange)=>{
    console.log(selectedRange)
    setRange(selectedRange)
  }

 

  // Context value
  const contextValue = {
    quotes,
    fetchQuotes,
    handleFilterChange,
    range
  };
  

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
