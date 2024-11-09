import "./Quote.css";

const Quote = ({ quote }, index) => {
  function convertTime(strTime) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(strTime);
    const formattedDate = date.toLocaleString("en-US", options);
    return `Date: ${formattedDate}`; // "Date: November 30, 1965 at 1:52 PM"
  }

  return (
    <div className="quote-card">
      <p className="quote-time">{convertTime(quote.time)}</p>
      <p className="quote-text" key={index}>
        <strong>{quote.name}</strong>: {quote.message}
      </p>
    </div>
  );
};

export default Quote;
