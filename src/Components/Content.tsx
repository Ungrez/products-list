import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductsList from "./Pages/ProductsList";
import Categories from "./Pages/Categories";
import EditProducts from "./Pages/EditProducts";
import EditCategories from "./Pages/EditCategories";
import CreateProduct from "./Pages/CreateProduct";
import {
  ProductItemType,
  CartItemCategory,
} from "../Components/Modules/Modules";

export const headers = new Headers({
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
});

const Content = () => {
  const [products, setProducts] = useState<Array<ProductItemType>>();
  const [categories, setCategories] = useState<Array<CartItemCategory>>();
  const [fresh, setFresh] = useState<boolean>(false);

  const urls = [
    "https://newdemostock.gopos.pl/ajax/219/product_categories?&size=0",
    "https://newdemostock.gopos.pl/ajax/219/products?size=0",
  ];

  let requests = urls.map((url) => fetch(url, { headers }));

  useEffect(() => {
    try {
      Promise.all(requests)
        .then((responses) => {
          return responses;
        })
        .then((responses) =>
          Promise.all(responses.map((response) => response.clone().json()))
        )
        .then((data) => {
          setCategories(data[0].data);
          setProducts(data[1].data);
        });
    } catch (error) {
      throw new Error("Whoops! Something went wrong. Try again later.");
    }
  }, [fresh]);

  return (
    <div id="routes">
      <Routes>
        <Route
          path="/products"
          element={<ProductsList props={{ products, categories }} />}
        ></Route>
        <Route
          path="/categories"
          element={<Categories props={{ products, categories }} />}
        ></Route>
        <Route
          path="/edit-products"
          element={<EditProducts props={{ products, categories, setFresh }} />}
        ></Route>
        <Route
          path="/edit-categories"
          element={<EditCategories props={{ categories, setFresh }} />}
        ></Route>
        <Route
          path="/new-product"
          element={<CreateProduct props={{ categories, setFresh }} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Content;
