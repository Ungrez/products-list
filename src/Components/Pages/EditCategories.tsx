import { useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CartItemCategory, headers, Response } from "../Modules/Modules";
import Alert from "react-bootstrap/Alert";

const EditCategories = ({ props }: any) => {
  const { categories, setFresh } = props;
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CartItemCategory>();
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [messageFromFetch, setMessageFromFetch] = useState<
    Array<Response> | undefined
  >();
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
    }
    setValidated(true);
    if (newCategoryName !== "") {
      setValidated(false);
      setShowModal(false);
      fetch("/editCategory", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          editCategoryId: editCategory?.id,
          newName: newCategoryName,
          uuid: editCategory?.uid,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFresh(true);
          setTimeout(() => {
            setFresh(false);
          }, 2000);
          return (
            setMessageFromFetch(data),
            setTimeout(() => {
              setMessageFromFetch(undefined);
            }, 3000)
          );
        });
      setNewCategoryName("");
    }
  };

  return (
    <>
      {messageFromFetch ? (
        <Alert variant={messageFromFetch.length > 0 ? "danger" : "success"}>
          {messageFromFetch.length > 0
            ? messageFromFetch.map((item) => {
                if (item.message === "constraints.nameIsUnique")
                  return "Name is already in used! ";
              })
            : "Successfully edited category"}
        </Alert>
      ) : null}
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th></th>
            <th>Category</th>
            <th>Edit Category</th>
          </tr>
        </thead>
        <tbody>
          {categories
            ? categories.map((category: CartItemCategory, index: number) => (
                <tr key={category.uid}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setEditCategory(category);
                      }}
                    >
                      Edit
                    </Button>
                    <Modal
                      show={showModal}
                      onHide={() => {
                        setShowModal(false);
                        setValidated(false);
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit category</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form noValidate validated={validated}>
                          <Form.Group className="mb-3">
                            <Form.Label>Old product name</Form.Label>
                            <Form.Control
                              placeholder={
                                editCategory
                                  ? JSON.stringify(editCategory.name)
                                  : "Null"
                              }
                              disabled
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>New category name</Form.Label>
                            <Form.Control
                              required
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setNewCategoryName(e.currentTarget.value)}
                              placeholder=""
                            />
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
                        <Button onClick={handleSubmit} variant="primary">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default EditCategories;
