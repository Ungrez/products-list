import { Routes, Route } from "react-router-dom";
import ProductsList from "./Pages/ProductsList";
import Categories from "./Pages/Categories";
import EditProducts from "./Pages/EditProducts";
import EditCategories from "./Pages/EditCategories";
import CreateProduct from "./Pages/CreateProduct";
import { headers } from "./Modules/Modules";
import { useEffect, useState } from "react";

const Content = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    try {
      Promise.all([
        fetch("https://newdemostock.gopos.pl/ajax/219/product_categories?", {
          headers: headers,
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then(({ data }) => {
            return setCategories(data);
          }),
        fetch("https://newdemostock.gopos.pl/ajax/219/products?", {
          headers: headers,
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then(({ data }) => {
            return setProducts(data);
          }),
      ]);
    } catch (error) {}
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
          element={<CreateProduct props={{ categories }} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Content;
