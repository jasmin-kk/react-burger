import React, { useEffect, useState } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../utils/data';
import style from './ingredients-group.module.css';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ModalOverlay } from '../../modal-overlay/modal-overlay';

interface IngredientsGroupProps {
  ingredients: Ingredient[];
}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({
  ingredients,
}) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };
  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    (acc[ingredient.type] = acc[ingredient.type] || []).push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);
  const order = ['bun', 'sauce', 'main'];

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className={style.scroll}>
      {order.map(
        (type) =>
          groupedIngredients[type] && (
            <div key={type} className={style.block}>
              <h2 className="text text_type_main-medium">
                {type === 'main'
                  ? 'Начинки'
                  : type === 'sauce'
                  ? 'Соусы'
                  : 'Булки'}
              </h2>
              <div className={style.list}>
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient._id}
                    className={style.item}
                    onClick={() => handleIngredientClick(ingredient)}
                  >
                    <IngredientItem ingredient={ingredient} />
                  </div>
                ))}
                {selectedIngredient && (
                  <>
                    <Modal title={selectedIngredient.name} onClose={closeModal}>
                      <IngredientDetails ingredient={selectedIngredient} />
                    </Modal>
                    <ModalOverlay onClose={closeModal} />
                  </>
                )}
              </div>
            </div>
          ),
      )}
    </div>
  );
};
