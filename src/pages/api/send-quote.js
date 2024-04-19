export default function handler(req, res) {
    if (req.method === 'POST') {
      // In a real application, you would send the quote to the customer via email or another method
      console.log("Sending quote to customer:", req.body);
      res.status(200).json({ message: "Quote sent successfully!" });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  