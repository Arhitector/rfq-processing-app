import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get('/api/get-quotes');
        setQuotes(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Quotes</h1>
      {quotes.length ? (
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>
              <h2>{quote.customer}</h2>
              <p>Due Date: {quote.dueDate}</p>
              <p>Total: ${quote.total}</p>
              <details>
                <summary>Products</summary>
                <ul>
                  {quote.products.map((product, idx) => (
                    <li key={idx}>{product.name} - Qty: {product.quantity} @ ${product.price} each</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes available.</p>
      )}
    </div>
  );
}

export default Quotes;
