import React from 'react';
// Components
import { Accordion, AccordionSummary, Typography, AccordionDetails, List, ListItem } from '@material-ui/core';
// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Types
import { RecentPurchasesAccordionProps } from '../types';
// Styles 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  }
});

const RecentPurchaseAccordion: React.FC<RecentPurchasesAccordionProps> = ({ purchase }) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={purchase.orderDate}
        id={purchase.orderDate}
      >
        <Typography>Order number #{purchase.orderId}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItem key={'date' + purchase.orderId}>
            <Typography variant='body1'>Date: {purchase.orderDate}</Typography>
          </ListItem>
          {purchase.orderedItems?.map(orderedItem => (
            <ListItem key={orderedItem.id}>
              <Typography >{orderedItem.amount} x {orderedItem.title}</Typography>
            </ListItem>
          ))}
          <ListItem key={'total' + purchase.orderId}>
            <Typography variant='body1' className={classes.bold}>Total: {purchase.orderTotal}</Typography>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>)
};

export default RecentPurchaseAccordion;