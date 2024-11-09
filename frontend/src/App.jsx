import "./App.css";
import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import Quote from "./components/Quote";
import DateSelect from "./components/DateSelect";

function App() {
  const { quotes, fetchQuotes, range } = useAppContext();

  useEffect(() => {
    fetchQuotes(range); // Fetch quotes on component mount
  }, [range]);

  return (
    <div className="App">
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      <form action="/api/quote" method="post">
		<label htmlFor="input-name">Name</label>
		<input type="text" name="name" id="input-name" required />
		<label htmlFor="input-message">Quote</label>
		<input type="text" name="message" id="input-message" required />
		<button type="submit">Submit</button>
	</form>

	<DateSelect/>

	

		
      <h2>Previous Quotes</h2>
      <div className="messages">
		{quotes.map((quote, index)=>(
			<Quote quote = {quote} index = {index} />
		))}
	
      </div>
    </div>
  );
}

export default App;
