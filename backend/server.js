const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to fetch data
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/braceletShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  category: String,
  image: String,
  description: String
});

const Product = mongoose.model("Product", ProductSchema);

// Fetch Products with Sorting & Filtering
app.get("/products", async (req, res) => {
  try {
    const { sort = "name", filter = 0 } = req.query;
    
    let query = {};
    if (filter != 0) query.category = filter; // Filter by category if not 0

    let products = await Product.find(query)
    if (sort === "price") {
      products = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      products = products.sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

