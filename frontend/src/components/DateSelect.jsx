import { useState } from "react";
import { useAppContext } from "../AppContext";

function DateSelect() {
  const [selectedRange, setSelectedRange] = useState("all");
  const { handleFilterChange } = useAppContext();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    handleFilterChange(value); 
  };

  return (
    <div>
      <label htmlFor="filter-select">Filter by time range:</label>
      <select id="filter-select" value={selectedRange} onChange={handleChange}>
        <option value="all">All Time</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>
    </div>
  );
}

export default DateSelect;
