import "./App.css";
import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import Quote from "./components/Quote";
import DateSelect from "./components/DateSelect";
import axios from "axios";
import logo from "./assets/logo.png"; // Import your logo image

function App() {
  const { quotes, fetchQuotes, range } = useAppContext();

  useEffect(() => {
    fetchQuotes(range); // Fetch quotes on component mount and whenever range filter is changed
  }, [range]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;
    try {
      const response = await axios.post(
        "/api/quote",
        new URLSearchParams({ name, message })
      );

      if (response.status === 200 || response.status === 303) {
        fetchQuotes(range);
      } else {
        console.error("Failed to submit quote");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    e.target.reset();
  };

  return (
    <div className="app-container">
      {/* Logo and Title Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="main-title">Hack at UCI Tech Deliverable</h1>
      </header>

      {/* Quote Submission Form */}
      <section className="quote-form">
        <h2>Submit a Quote</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="input-name">Name</label>
            <input type="text" name="name" id="input-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="input-message">Quote</label>
            <input type="text" name="message" id="input-message" required />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </section>

      {/* Date Selection */}
      <DateSelect />

      {/* Previous Quotes Section */}
      <section className="previous-quotes">
        <h2>Previous Quotes</h2>
        <div className="messages">
          {quotes.length > 0 ? (
            quotes.map((quote, index) => (
              <Quote key={index} quote={quote} index={index} />
            ))
          ) : (
            <p>No quotes available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
