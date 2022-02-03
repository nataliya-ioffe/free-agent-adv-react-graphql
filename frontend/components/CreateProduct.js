import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import DisplayError from './DisplayError';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';
import useForm from '../lib/useForm';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #   which variables are getting passed in? What types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # In our case, the Product Image is a different data type with a -relationship- to the Product.
        # Here we are creating a ProductImage with the passed in image and description, and making a relationship between it and the Product
        photo: { create: { image: $image, altText: $description } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm();

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      //   refetch data from network so new mutation shows up immediately on the front end
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        // Submit the input fields to the backend via GraphQL:
        const response = await createProduct();
        clearForm();
        // After submitting form sucessfully, go to newly created product page using product/id as slug
        // Next.js will use [id].js template in Pages to create this slug
        Router.push({
          pathname: `/product/${response.data.createProduct.id}`,
        });
      }}
    >
      {/* The error component returns null if no error */}
      <DisplayError error={error} />

      {/* Show loading animation and disable inputs if its loading */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

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

      <button type="submit">Add Product</button>
    </Form>
  );
}
