import { Table } from "react-bootstrap";
import { CartItemCategory } from "../Modules/Modules";

const Categories = ({ props }: any) => {
  const { categories } = props;

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categories
            ? categories.map((category: CartItemCategory, index: number) => (
                <tr key={category.uid}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default Categories;
