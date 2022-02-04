import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  display: grid;
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
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!user) return null;

  const totalCartPrice = formatMoney(calcTotalPrice(user.cart));

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
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
