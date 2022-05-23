import React from "react";
// Components
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Button, IconButton } from '@material-ui/core';
// Icons
import CloseIcon from '@material-ui/icons/Close';
//Types
import { CartItemDialogProps } from "../types";

const CartItemDialog: React.FC<CartItemDialogProps> = ({ openDialog, selectedItem, handleClose, handleAddToCart }) => {
    return (
        <Dialog onClose={handleClose} open={openDialog} >
            <DialogActions>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <Grid
                container
                direction="row"
                justify="space-between"
            >
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogTitle>${selectedItem.price}</DialogTitle>
            </Grid>
            <DialogContent>
                <DialogContentText>Category : {selectedItem.category}</DialogContentText>
                <DialogContentText>
                    {selectedItem.description}
                </DialogContentText>
            </DialogContent>
            <Button variant="text" onClick={() => handleAddToCart(selectedItem)}>Add to Cart</Button>
        </Dialog>
    )
};
export default CartItemDialog;