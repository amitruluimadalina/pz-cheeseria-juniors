import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import CartItemDialog from './Dialog/Dialog';
import Notification from './Notification/Notification';
import RecentPurchases from './RecentPurchases/RecentPurchases';
import { Toolbar, Typography, Badge, Grid, LinearProgress, Drawer } from '@material-ui/core';
//Icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
// Types
import { CartItemType } from './types';
// Functions
import { getTotalItems, getPurchaseObject } from './utils';
// Services
import { getCheeses } from './Services/CheeseService';
import { postPurchase } from './Services/PurchaseService';

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({} as CartItemType);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [recentPurchasesOpen, setRecentPurchasesOpen] = React.useState(false);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleViewDetailsDialog = (item: CartItemType) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseNotification = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  const handlePurchaseResponse = (responsePostRequest: Response) => {
    if (responsePostRequest) {
      if (responsePostRequest.status === 200) {
        setCartItems([] as CartItemType[])
        setNotificationMessage('Thank you for your order');
      }
      else {
        setNotificationMessage('Ooops, something went wrong');
      }
      setOpenNotification(true);
    }
  };
  
  const handlePurchase = async () => {
    const purchaseObject = getPurchaseObject(cartItems);
    const responsePostRequest = await postPurchase(purchaseObject);
    handlePurchaseResponse(responsePostRequest);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={() => setRecentPurchasesOpen(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>
            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>
            <StyledButton data-cy={`cart-button`} onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>
              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          onPurchase={handlePurchase}
        />
        <Notification openNotification={openNotification} handleClose={(event) => handleCloseNotification(event)} message={notificationMessage} />
      </Drawer>
      <Drawer anchor='left' open={recentPurchasesOpen} onClose={() => setRecentPurchasesOpen(false)}>
        <RecentPurchases />
      </Drawer>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} handleViewDetails={handleViewDetailsDialog} />
          </Grid>
        ))}
      </Grid>
      <CartItemDialog selectedItem={selectedItem} openDialog={openDialog} handleClose={handleCloseDialog} handleAddToCart={handleAddToCart} />
    </Wrapper>
  );
};

export default App;