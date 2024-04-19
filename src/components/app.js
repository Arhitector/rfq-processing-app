import React, { useState } from 'react';
import RfqForm from './RfqForm';
import QuoteDisplay from './QuoteDisplay';
import axios from 'axios';

function App() {
  const [currentQuote, setCurrentQuote] = useState(null);

  const sendQuote = async (quote) => {
    try {
      await axios.post('/api/send-quote', quote);
      alert('Quote sent successfully!');
    } catch (error) {
      console.error('Failed to send quote:', error);
    }
  };

  return (
    <div>
      <RfqForm setQuote={setCurrentQuote} />
      {currentQuote && <QuoteDisplay quote={currentQuote} onSend={sendQuote} />}
    </div>
  );
}

export default App;