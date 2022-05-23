import React from 'react';
// Components
import CartItem from './CartItem/CartItem';
import { Button, Grid } from '@material-ui/core';
// Styles
import { Wrapper } from './Cart.styles';
// Types
import { CartProps } from '../types';
// Functions
import { calculateTotal } from '../utils';

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart, onPurchase }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Grid container
        justify="center"
      >
        {cartItems.length !== 0 &&
          <Button size="medium" variant="contained"  data-cy={`purchase-button`} onClick={onPurchase}>Purchase</Button>
        }
      </Grid>
    </Wrapper>
  );
};

export default Cart;
