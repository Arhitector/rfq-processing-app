const db = require('../../lib/db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const parsedContent = parseEmailContent(email);
    if (!parsedContent.isRfq) {
      res.status(200).json({ message: "Not an RFQ" });
      return;
    }

    const quote = createQuoteFromEmail(parsedContent);
    db.insert(quote, (err, newDoc) => {
      if (err) {
        res.status(500).json({ message: 'Error saving the quote.' });
        return;
      }
      res.status(200).json(newDoc);
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function parseEmailContent(email) {
  const productPrices = {
    'Metal Sheet': 22,
    'Aluminum Coil': 24
  };
  const defaultPrice = 50;
  const response = {
    isRfq: false,
    customer: '',
    products: [],
    dueDate: ''
  };

  response.isRfq = email.toLowerCase().includes("quote");

  const customerMatch = email.match(/customer name:\s*(.*)/i);
  if (customerMatch) {
    response.customer = customerMatch[1].trim();
  }

  const productRegex = /-\s*(.*),\s*quantity:\s*(\d+)/ig;
  let productMatch;
  let total = 0
  while ((productMatch = productRegex.exec(email)) !== null) {
    const price = productPrices[productMatch[1].trim()] || defaultPrice;
    const quantity = parseInt(productMatch[2], 10);

    response.products.push({
      name: productMatch[1].trim(),
      quantity: quantity,
      price: price
    });
    total += quantity * price;
  }

  response.total = total;

  const dateMatch = email.match(/due date:\s*(\d{4}-\d{2}-\d{2})/i);
  if (dateMatch) {
    response.dueDate = dateMatch[1];
  }

  return response;
}

function createQuoteFromEmail(parsedContent) {
  return {
    customer: parsedContent.customer,
    products: parsedContent.products,
    dueDate: parsedContent.dueDate,
    total: calculateTotal(parsedContent.products)
  };
}

function calculateTotal(products) {
  return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
}
