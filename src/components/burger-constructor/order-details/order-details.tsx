import React, {FC} from 'react';
import doneImage from '../../../images/done.png';
import style from '../order-details/order-details.module.css';

export const OrderDetails: FC = () => {
  return (
    <div className={style.main}>
      <h3 className="text text_type_digits-large mb-8">034536</h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={`mb-15 ${style.img}`} src={doneImage} alt="done" />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-small mb-30 ${style.color}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
