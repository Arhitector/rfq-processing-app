import React from 'react';

function QuoteDisplay({ quote, onSend }) {
  return (
    <div>
      <h3>Structured Quote</h3>
      <pre>{JSON.stringify(quote, null, 2)}</pre>
      <button onClick={() => onSend(quote)}>Send Quote</button>
    </div>
  );
}

export default QuoteDisplay;
