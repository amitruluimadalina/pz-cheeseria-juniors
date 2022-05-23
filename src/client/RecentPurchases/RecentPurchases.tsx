import React from 'react';
import { useQuery } from 'react-query';
// Components
import RecentPurchaseAccordion from "./RecentPurchaseAccordion";
import { LinearProgress } from '@material-ui/core';
// Styles
import { Wrapper } from '../Cart/Cart.styles';
// Types
import { PurchaseType } from "../types";
// Functions
import { getRecentPurchases } from '../Services/PurchaseService';

const RecentPurchases = () => {
  const { data, isLoading, error } = useQuery<PurchaseType[]>(
    'recentPurchases',
    getRecentPurchases
  );
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <h2>Recent Purchases</h2>
      {data?.length === 0 && <p>No Recent Purchase.</p>}
      {data?.map(item => (
        <RecentPurchaseAccordion key={item.orderId} purchase={item} />
      ))}
    </Wrapper>
  );
};

export default RecentPurchases;