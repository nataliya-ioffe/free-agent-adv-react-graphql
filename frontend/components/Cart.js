import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney.js';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  grid: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  const itemQuantityTotal = formatMoney(product.price * cartItem.quantity);
  const itemPrice = formatMoney(product.price);

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {itemQuantityTotal}
          <em>
            {' '}
            ({cartItem.quantity} &times; ${itemPrice} each)
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const totalCartPrice = formatMoney(calcTotalPrice(user.cart));

  if (!user) return null;

  return (
    <CartStyles open>
      <header>
        <Supreme> {user.name}'s Cat</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{totalCartPrice}</p>
      </footer>
    </CartStyles>
  );
}
