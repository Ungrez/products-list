import { useState } from "react";
import { headers } from "../Content";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import {
  CartItemCategory,
  ProductItemType,
  Response,
} from "../Modules/Modules";
import "../../Styles/EditProducts.css";

const EditProducts = ({ props }: any) => {
  const { products, categories, setFresh } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<ProductItemType>();
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductCategory, setNewProductCategory] = useState<number>(0);
  const [messageFromFetch, setMessageFromFetch] =
    useState<Array<Response> | null>();
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = () => {
    setValidated(true);
    if (newProductName.length && newProductCategory !== 0) {
      setValidated(false);
      setShowModal(false);
      fetch("/editProduct", {
        headers,
        method: "PUT",
        body: JSON.stringify({
          product_id: editProduct?.id,
          productName: newProductName,
          uid: editProduct?.uid,
          categoryID: newProductCategory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFresh(true);
          setTimeout(() => {
            setFresh(false);
          }, 2000);
          return (
            setMessageFromFetch(data),
            setTimeout(() => {
              setMessageFromFetch(null);
            }, 3000)
          );
        });
      setNewProductCategory(0);
    }
  };

  return (
    <>
      {messageFromFetch ? (
        <Alert variant={messageFromFetch.length ? "danger" : "success"}>
          {messageFromFetch.length
            ? messageFromFetch.map((item) => {
                if (item.message === "product_with_name_exists")
                  return "Name is already in use! ";
              })
            : "Successfully edited product"}
        </Alert>
      ) : null}
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Category</th>
            <th>Edit Product</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item: ProductItemType, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                {categories
                  ? categories
                      .filter((obj: CartItemCategory) => {
                        return obj.id === item.category_id;
                      })
                      .map((obj: CartItemCategory) => {
                        return obj.name;
                      })
                  : "loading categories"}
              </td>
              <td>
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setEditProduct(item);
                  }}
                >
                  Edit
                </Button>
                <Modal
                  animation={false}
                  backdrop={false}
                  show={showModal}
                  onHide={() => {
                    setShowModal(false);
                    setValidated(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form noValidate validated={validated}>
                      <Form.Group className="mb-3">
                        <Form.Label>Old product name</Form.Label>
                        <Form.Control
                          placeholder={
                            editProduct
                              ? JSON.stringify(editProduct.name)
                              : "Null"
                          }
                          disabled
                        />
                        <Form.Control.Feedback type="invalid" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Old product category</Form.Label>
                        <Form.Control
                          placeholder={
                            editProduct
                              ? categories
                                  .filter((item: CartItemCategory) => {
                                    return item.id === editProduct.category_id;
                                  })
                                  .map((item: CartItemCategory) => {
                                    return item.name;
                                  })
                              : "null"
                          }
                          disabled
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New product name</Form.Label>
                        <Form.Control
                          required
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewProductName(e.currentTarget.value)
                          }
                          placeholder=""
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Select new category</Form.Label>
                        <Form.Select
                          required
                          onChange={(e) =>
                            categories
                              .filter((item: CartItemCategory) => {
                                return item.name === e.target.value;
                              })
                              .map((item: CartItemCategory) => {
                                return setNewProductCategory(item.id);
                              })
                          }
                        >
                          <option></option>
                          {categories
                            ? categories.map((obj: CartItemCategory) => {
                                return (
                                  <option key={obj.uid}>{obj.name}</option>
                                );
                              })
                            : "Loading categories"}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowModal(false);
                        setValidated(false);
                      }}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EditProducts;
