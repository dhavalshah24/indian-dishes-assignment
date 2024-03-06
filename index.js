const express = require("express");
const csvParser = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const routes = require("./routes/v1");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Convert CSV to JSON and save it in the "data/" directory
const dishesData = [];
fs.createReadStream("data/indian_food.csv")
  .pipe(csvParser())
  .on("data", (row) => {
    for (const key in row) {
      // Convert numeric strings to numbers
      if (!isNaN(row[key])) {
        row[key] = parseFloat(row[key]);
      }
      // Treat -1 as null
      if (row[key] === -1) {
        row[key] = null;
      }
    }
    dishesData.push(row);
  })
  .on("end", () => {
    fs.writeFileSync("data/dishes.json", JSON.stringify(dishesData, null, 2));
    console.log("CSV data converted and saved as JSON");
  });

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
