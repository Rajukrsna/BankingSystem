import express from "express";
import Razorpay from "razorpay";

const app = express();
const port = 3000;

// Replace with your actual Razorpay key and secret
const razorpay = new Razorpay({
    key_id: 'rzp_test_HZ8ydebydgJ3DE',
    key_secret: 'J9zSvq3EKVwcFdJbN5gaiPSK',
});
app.use(express.static("public"))
app.get("/", (req, res) => {
    res.render("index.ejs")
  });
// Endpoint to generate a new order ID
app.get('/generateOrder', (req, res) => {
    const options = {
        amount: 1000, // Example: 1000 in paisa (₹10)
        currency: 'INR',
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ orderId: order.id });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
  