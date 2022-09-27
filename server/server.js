const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const headers = new Headers({
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
});

app.put("/editCategory", async (req, res) => {
  try {
    const newCategory = {
      id: req.body.editCategoryId,
      uid: req.body.uuid,
      name: req.body.newName,
    };

    // const newCategory = {
    //   id: 547,
    //   uid: "c32e0302-c8f1-4728-8d4b-db9b254f9e1b",
    //   name: "Alkohole",
    // };

    const url = `https://newdemostock.gopos.pl/ajax/219/product_categories/${newCategory.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newCategory),
    }).then((response) => response.json());

    return res.send(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.post("/createCategory", async (req, res) => {
  try {
    const newCategory = {
      name: req.body.categoryName,
    };
    const url = "https://newdemostock.gopos.pl/ajax/219/product_categories";
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newCategory),
    }).then((response) => response.json());

    return res.send(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.post("/createProduct", async (req, res) => {
  try {
    let name = req.body.name;
    let categoryID = req.body.category_id;

    const newProduct = {
      name: name,
      type: "BASIC",
      measure_type: "ITEM",
      category_id: categoryID,
      tax_id: 1,
      item_name: name,
      components: [
        {
          product_id: 0,
          recipe_amount: 1,
          sub_product: {
            name: name,
          },
        },
      ],
    };
    const url = "https://newdemostock.gopos.pl/ajax/219/products/create";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
      },
      body: JSON.stringify(newProduct),
    }).then((response) => response.json());

    return res.send(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
app.listen(5000, () => console.log("I am on port 5000"));
