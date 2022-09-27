import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { CartItemCategory, ProductItemType, headers } from "../Modules/Modules";
import "../../Styles/EditProducts.css";
import Modal from "react-bootstrap/Modal";

const EditProducts = ({ props }: any) => {
  const { products, categories } = props;
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductItemType>();
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<number>(0);

  const handleEdit = () => {
    setShowModal(false);
    fetch("/editProduct", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        editProductId: editProduct?.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return console.log(data);
      });
  };

  return (
    <>
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
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewProductName(e.currentTarget.value)
                        }
                        placeholder=""
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Select new category</Form.Label>
                      <Form.Select
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
                              return <option key={obj.uid}>{obj.name}</option>;
                            })
                          : "Loading categories"}
                      </Form.Select>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
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
