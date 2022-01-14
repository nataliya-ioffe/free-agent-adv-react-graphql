import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm();

  return (
    <form action="">
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
          type="text"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear form
      </button>

      <button type="button" onClick={resetForm}>
        Reset form
      </button>
    </form>
  );
}
