import React, { FC } from 'react';
import style from './feed-details.module.css';
import { OrderDetails } from '../../components/order-details/order-details';

export const FeedDetailsPage: FC = () => {
  return (
    <>
      <div className={style.block}>
        <OrderDetails />
      </div>
    </>
  );
};
