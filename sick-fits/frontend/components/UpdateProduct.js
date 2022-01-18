import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import DisplayError from './DisplayError';
import Form from './styles/Form';
import useForm from '../lib/useForm';

//  Could also use SINGLE_PRODUCT_QUERY from SingleProduct.js file
const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. Get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  // 2. Get the mutation to update the product
  // Change names of 'data' so it's not repeated from above
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  //   3. Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;

  // 4. Create form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        const response = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        // TODO: handle submit
        //     // Submit the input fields to the backend via GraphQL:
        //     const response = await createProduct();
        //     clearForm();
        //     // After submitting form sucessfully, go to newly created product page using product/id as slug
        //     // Next.js will use [id].js template in Pages to create this slug
        //     Router.push({
        //       pathname: `/product/${response.data.createProduct.id}`,
        //     });
      }}
    >
      <DisplayError error={error || updateError} />

      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="number">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          <textarea
            type="textarea"
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit">Update Product</button>
    </Form>
  );
}
