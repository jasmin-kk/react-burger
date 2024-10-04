import React, { useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import { Ingredient } from '../../utils/data';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
}

export const BurgerConstructor: React.FC<BurgerIngredientsProps> = ({
  ingredients,
}) => {
  const [isModalOpen, setModalOpen] = useState(false); // Состояние для открытия модального окна

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={style.main}>
      <ConstructorElement
        extraClass={style.element}
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <div className={style.scroll}>
        {ingredients.map((ingredient) => (
          <div key={ingredient._id} className={style.scrollBlock}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass={style.elementList}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>
      <ConstructorElement
        extraClass={style.element}
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <div className={style.footer}>
        <p className={`text text_type_digits-default ${style.sum}`}>
          1234
          <CurrencyIcon type="primary" className={style.icon} />
        </p>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
