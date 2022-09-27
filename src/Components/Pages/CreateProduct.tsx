import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../Styles/CreateProduct.css";
import { useState } from "react";
import { headers, CartItemCategory } from "../Modules/Modules";

const CreateProduct = ({ props }: any) => {
  const { categories } = props;

  const [productName, setProductName] = useState<string>("");

  const [categoryID, setCategoryID] = useState<number>(0);

  const [categoryName, setCategoryName] = useState<string>("");

  // Oject.keys

  //Object.values / .entries

  const test = () => {
    fetch("/createCategory", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return console.log(data);
      });
  };

  const createProduct = () => {
    fetch("/createProduct", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        name: productName,
        category_id: categoryID,
      }),
    }).then((response) => {
      return console.log(response.json());
    });
  };

  return (
    <>
      <div id="create-product">
        <Form.Group className="mb-3">
          <h3>Create new product</h3>
          <Form.Label>Product name</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProductName(e.currentTarget.value);
            }}
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select category</Form.Label>
          <Form.Select
            onChange={(e) =>
              categories
                .filter((item: CartItemCategory) => {
                  return item.name === e.target.value;
                })
                .map((item: CartItemCategory) => {
                  return setCategoryID(item.id);
                })
            }
          >
            <option></option>
            {categories
              ? categories.map((obj: CartItemCategory) => {
                  return <option key={obj.uid}>{obj.name}</option>;
                })
              : "Loading categories"}
          </Form.Select>
        </Form.Group>
        <Button onClick={createProduct}>Add new product</Button>
      </div>

      <div id="create-categry">
        <Form.Group className="mb-3">
          <h3>Create new category</h3>
          <Form.Label>Category name</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCategoryName(e.currentTarget.value);
            }}
            placeholder=""
          />
        </Form.Group>
        <Button onClick={test}>Add new category</Button>
      </div>
    </>
  );
};

export default CreateProduct;
