import { useState } from "react";
import { CartItemCategory, Response } from "../Modules/Modules";
import { headers } from "../Content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../../Styles/CreateProduct.css";

const CreateProduct = ({ props }: any) => {
  const { categories, setFresh } = props;
  const [productName, setProductName] = useState<string>("");
  const [categoryID, setCategoryID] = useState<number>(0);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryResponse, setCategoryResponse] =
    useState<Array<Response> | null>();
  const [productResponse, setProductResponse] =
    useState<Array<Response> | null>();
  const [validatedCategory, setValidatedCategory] = useState<boolean>(false);
  const [validatedProduct, setValidatedProduct] = useState<boolean>(false);

  const handleCreateCategory = () => {
    setValidatedCategory(true);
    if (categoryName.length) {
      setValidatedCategory(false);
      fetch("/createCategory", {
        headers,
        method: "POST",
        body: JSON.stringify({
          categoryName: categoryName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFresh(true);
          setTimeout(() => {
            setFresh(false);
          }, 2000);
          return (
            setCategoryResponse(data),
            setTimeout(() => {
              setCategoryResponse(null);
            }, 3000)
          );
        });
      setCategoryName("");
    }
  };
  const handleCreateProduct = () => {
    setValidatedProduct(true);
    if (productName.length && categoryID !== 0) {
      setValidatedProduct(false);
      fetch("/createProduct", {
        headers,
        method: "POST",
        body: JSON.stringify({
          name: productName,
          category_id: categoryID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFresh(true);
          setTimeout(() => {
            setFresh(false);
          }, 2000);
          return (
            setProductResponse(data),
            setTimeout(() => {
              setProductResponse(null);
            }, 3000)
          );
        });
    }
  };

  return (
    <>
      {categoryResponse ? (
        <Alert variant={categoryResponse.length ? "danger" : "success"}>
          {categoryResponse.length
            ? categoryResponse.map((item) => {
                if (item.message === "constraints.nameIsUnique")
                  return "Name is already in used! ";
              })
            : "Successfully added category"}
        </Alert>
      ) : null}
      {productResponse ? (
        <Alert variant={productResponse.length > 0 ? "danger" : "success"}>
          {productResponse.length > 0
            ? productResponse.map((item) => {
                if (item.message === "product_with_name_exists")
                  return "Name is already in used! ";
              })
            : "Successfully added product"}
        </Alert>
      ) : null}
      <div id="create-product">
        <Form noValidate validated={validatedProduct}>
          <Form.Group className="mb-3">
            <h3>Create new product</h3>
            <Form.Label>Product name</Form.Label>
            <Form.Control
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProductName(e.currentTarget.value);
              }}
              placeholder=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter a product name!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select category</Form.Label>
            <Form.Select
              required
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
            <Form.Control.Feedback type="invalid">
              Please select a category!
            </Form.Control.Feedback>
          </Form.Group>
          <Button onClick={handleCreateProduct}>Add new product</Button>
        </Form>
      </div>

      <div id="create-categry">
        <Form noValidate validated={validatedCategory}>
          <Form.Group className="mb-3">
            <h3>Create new category</h3>
            <Form.Label>Category name</Form.Label>
            <Form.Control
              required
              value={categoryName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCategoryName(e.currentTarget.value);
              }}
              placeholder=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter a category name!
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Button onClick={handleCreateCategory}>Add new category</Button>
      </div>
    </>
  );
};

export default CreateProduct;
