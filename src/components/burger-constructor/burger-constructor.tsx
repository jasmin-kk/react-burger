import React, { FC, useState, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import { Ingredient } from '../../utils/data';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';

interface BurgerConstructorProps {
  ingredients: Ingredient[];
  onIngredientDrop: (ingredient: Ingredient) => void;
  onIngredientRemove: (ingredientId: string) => void;
}

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  ingredients,
  onIngredientDrop,
  onIngredientRemove,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  const [bun, setBun] = useState<Ingredient | null>(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredient: Ingredient }) => {
      const ingredient = item.ingredient;

      if (ingredient.type === 'bun') {
        setBun(ingredient);
      } else {
        setAddedIngredients((prev) => [...prev, ingredient]);
      }

      onIngredientDrop(ingredient);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    onIngredientRemove(ingredientId);
    setAddedIngredients((prev) =>
      prev.filter((ing) => ing._id !== ingredientId)
    );
  };

  const totalPrice = useMemo(() => {
    const bunPrice = (bun?.price || 0) * 2;
    const ingredientsPrice = addedIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, addedIngredients]);

  return (
    <div ref={drop} className={style.main}>
      {!bun && addedIngredients.length === 0 && (
        <>
          <div className={`${style.null} ${style['m-1']}`}></div>
          <div className={`${style.middle} ${style['m-1']}`}></div>
          <div className={`${style.nullBottom} ${style['m-1']}`}></div>
        </>
      )}

      {bun && (
        <ConstructorElement
          type="top"
          extraClass="m-1"
          isLocked={!!bun}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}

      <div className={style.scroll}>
        {addedIngredients.map((ingredient) => (
          <div key={ingredient._id} className={style.scrollBlock}>
            <ConstructorElement
              extraClass="m-1"
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={() => handleRemoveIngredient(ingredient._id)}
            />
          </div>
        ))}
      </div>

      {bun && (
        <ConstructorElement
          extraClass="m-1"
          type="bottom"
          isLocked={!!bun}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}

      <div className={style.footer}>
        <p className={`text text_type_digits-default ${style.sum}`}>
          {totalPrice} <CurrencyIcon type="primary" />
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
