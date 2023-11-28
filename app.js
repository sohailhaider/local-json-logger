const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
    limit: "50mb",
  })
);

app.post("/", (req, res) => {
  const data = req.body;
  const filePath = "data.json";

  // Read existing data from the file
  fs.readFile(filePath, (err, fileData) => {
    let jsonArray = [];

    if (!err && fileData) {
      try {
        jsonArray = JSON.parse(fileData);
      } catch (parseErr) {
        return res.status(500).send("Error parsing existing file.");
      }
    }

    // Append new data to the array
    jsonArray.push(data);

    // Write updated array back to the file
    fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error writing to file.");
      }
      res.status(200).send("Data received and logged.");
    });
  });
});

app.get("/get-data", (req, res) => {
  const filePath = "data.json";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading file.");
    } else {
      res.status(200).contentType("application/json").send(data);
    }
  });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Start the server
app.listen(8765, () => {
  console.log("Server is running on port http://localhost:8765");
});
