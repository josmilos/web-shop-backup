import React from 'react';
import { styled } from '@mui/system';

const CartItemWrapper = styled('li')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #16273E',
  padding: '1rem 0',
  margin: '1rem 0',
});

const ItemContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const ItemTitle = styled('h2')({
  margin: '0 0 0.5rem 0',
  color: '#363636',
});

const SummaryWrapper = styled('div')({
  width: '10rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ItemPrice = styled('span')({
  fontWeight: 'bold',
  color: '#16273E',
});

const ItemAmount = styled('span')({
  fontWeight: 'bold',
  border: '1px solid #ccc',
  padding: '0.25rem 0.75rem',
  borderRadius: '6px',
  color: '#363636',
});

const ActionButtonsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const CartItem = (props) => {
  const price = `$${Number(props.price).toFixed(2)}`;

  return (
    <CartItemWrapper>
      <ItemContent>
        <ItemTitle>{props.name}</ItemTitle>
        <SummaryWrapper>
          <ItemPrice>{price}</ItemPrice>
          <ItemAmount>x {props.quantity}</ItemAmount>
        </SummaryWrapper>
      </ItemContent>
      <ActionButtonsWrapper>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </ActionButtonsWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;
