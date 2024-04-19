import React, { useState } from 'react';
import axios from 'axios';

function RfqForm() {
  const [emailContent, setEmailContent] = useState('');
  const [quote, setQuote] = useState(null);

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('/api/process-email', { email: emailContent });
      setQuote(response.data);
    } catch (error) {
      console.error('Error processing email:', error);
    }
  };

  return (
    <div>
      <textarea
        value={emailContent}
        onChange={e => setEmailContent(e.target.value)}
        placeholder="Paste RFQ email content here..."
      />
      <button onClick={handleEmailSubmit}>Process RFQ</button>
      {quote && <div><pre>{JSON.stringify(quote, null, 2)}</pre></div>}
    </div>
  );
}

export default RfqForm;
