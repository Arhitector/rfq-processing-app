## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

there are two routes available [http://localhost:3000](/)' and [http://localhost:3000/quotes](quotes)

## usage

email example:
```
Subject: Request for Quotation

Dear Sales Team,

We are interested in purchasing the following items:
- Metal Sheet, quantity: 10
- Aluminum Coil, quantity: 5

Please provide a quote including pricing, shipping costs, and estimated delivery dates.

Thank you,
Jane Doe
Example Company Inc.
```

we have  next hardcoded prices

```
const productPrices = {
    'Metal Sheet': 22,
    'Aluminum Coil': 24
  };
```