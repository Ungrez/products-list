import { Table } from "react-bootstrap";
import { ProductItemType, CartItemCategory } from "../Modules/Modules";

const ProductsList = ({ props }: any) => {
  const { products, categories } = props;

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Category</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductsList;
