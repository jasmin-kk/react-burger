import React, { FC, useState, useMemo, useEffect } from 'react';
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
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store';
import { placeOrder } from '../../services/order-object';
import { updateIngredientOrder } from '../../services/burger-constructor';
import { useNavigate } from 'react-router-dom';
import { SortableIngredient } from './sortable-ingredient/sortable-ingredient';

const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

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
  const [bun, setBun] = useState<Ingredient | null>(null);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.order.error);
  const isAuthenticated = useAppSelector((state) => state.authSlice.user);
  const navigate = useNavigate();

  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const savedIngredients = localStorage.getItem('addedIngredients');
    const savedBun = localStorage.getItem('bunIngredient');

    if (!accessToken) {
      localStorage.removeItem('addedIngredients');
      localStorage.removeItem('bunIngredient');
    } else {
      if (savedIngredients) {
        const ingredientsFromStorage: Ingredient[] =
          JSON.parse(savedIngredients);
        setAddedIngredients(ingredientsFromStorage);
      }

      if (savedBun) {
        const bunFromStorage: Ingredient = JSON.parse(savedBun);
        setBun(bunFromStorage);
      }
    }
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredient: Ingredient }) => {
      const ingredient = { ...item.ingredient, id: generateUniqueId() };

      if (ingredient.type === 'bun') {
        if (bun && addedIngredients.length === 0) {
          return;
        }
        setBun(ingredient);
        localStorage.setItem('bunIngredient', JSON.stringify(ingredient));
      } else {
        setAddedIngredients((prev) => {
          const updated = [...prev, ingredient];
          localStorage.setItem('addedIngredients', JSON.stringify(updated));
          return updated;
        });
      }

      onIngredientDrop(ingredient);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleRemoveIngredient = (ingredientId: string) => {
    onIngredientRemove(ingredientId);
    setAddedIngredients((prev) => {
      const updated = prev.filter(
        (ingredient) => ingredient.id !== ingredientId
      );
      localStorage.setItem('addedIngredients', JSON.stringify(updated));
      return updated;
    });
  };

  const moveIngredient = (fromIndex: number, toIndex: number) => {
    const updatedIngredients = Array.from(addedIngredients);
    const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
    updatedIngredients.splice(toIndex, 0, movedIngredient);
    setAddedIngredients(updatedIngredients);
    localStorage.setItem(
      'addedIngredients',
      JSON.stringify(updatedIngredients)
    );
    dispatch(updateIngredientOrder(updatedIngredients));
  };

  const totalPrice = useMemo(() => {
    const bunPrice = (bun?.price || 0) * 2;
    const ingredientsPrice = addedIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, addedIngredients]);

  const handleOrder = () => {
    const ingredientsIds: string[] = [
      bun?._id,
      ...addedIngredients.map((ing) => ing._id),
    ].filter((id): id is string => id !== undefined);

    if (ingredientsIds.length === 0) {
      return;
    }

    if (isAuthenticated) {
      dispatch(placeOrder(ingredientsIds))
        .unwrap()
        .then(() => openModal())
        .catch((error) => console.error('Ошибка оформления заказа:', error));
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Ошибка при оформлении заказа:', error);
    }
  }, [error]);

  return (
    <div ref={drop} className={style.main}>
      {error && (
        <p className="text text_type_main-small text_color_inactive">{error}</p>
      )}

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
        {addedIngredients
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient, index) => (
            <SortableIngredient
              key={ingredient.id || index}
              ingredient={ingredient}
              index={index}
              moveIngredient={moveIngredient}
              handleRemove={handleRemoveIngredient}
            />
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
          onClick={handleOrder}
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!bun}
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
