const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const purchasesRoutes = require('./routes/purchases');
const app = express();

mongoose.connect('mongodb://localhost:27017/mernproject')
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use('/api/purchases', purchasesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
