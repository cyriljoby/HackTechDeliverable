const Quote =({quote}, index) =>{
    function convertTime(strTime){
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
          const date = new Date(strTime)
          const formattedDate = date.toLocaleString('en-US', options);
          return (`Date: ${formattedDate}`); // "Date: November 30, 1965 at 1:52 PM"
          
      }
    
    return(
        <div>
			<p>{convertTime(quote.time)}</p>
			<p key={index}><b>{quote.name}</b>: {quote.message}</p>
		</div>
    )
}

export default Quote;