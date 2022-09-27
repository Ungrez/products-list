import { useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CartItemCategory } from "../Modules/Modules";
const EditCategories = ({ props }: any) => {
  const { categories } = props;
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CartItemCategory>();
  const [newCategory, setNewCategory] = useState<string>();
  const [newCategoryName, setNewCategoryName] = useState<string>();

  const handleEditCategory = () => {
    setShowModal(false);
    fetch("/editCategory", {
      method: "PUT",
      body: JSON.stringify({
        editCategoryId: editCategory?.id,
        newName: newCategoryName,
        uuid: editCategory?.uid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return console.log(data);
      });
  };

  return (
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
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewCategoryName(e.currentTarget.value)
                          }
                          placeholder=""
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                      <Button onClick={handleEditCategory} variant="primary">
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
  );
};

export default EditCategories;
