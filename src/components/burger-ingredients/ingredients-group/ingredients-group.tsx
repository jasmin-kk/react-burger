import React, {FC, useEffect, useMemo, useState} from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../utils/data';
import style from './ingredients-group.module.css';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

interface IngredientsGroupProps {
  ingredients: Ingredient[];
}

export const IngredientsGroup: FC<IngredientsGroupProps> = ({ingredients,}) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };
  const groupedIngredients = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => {
      (acc[ingredient.type] = acc[ingredient.type] || []).push(ingredient);
      return acc;
    }, {} as Record<string, Ingredient[]>);
  }, [ingredients]);

  const order = ['bun', 'sauce', 'main'];

  const ingredientTypeTitles: Record<string, string> = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  return (
    <div className={style.scroll}>
      {order.map((type) => groupedIngredients[type] && (
        <div key={type} className={style.block}>
          <h2 className="text text_type_main-medium">
            {ingredientTypeTitles[type]}
          </h2>
          <div className={style.list}>
            {groupedIngredients[type].map((ingredient) => (
              <div key={ingredient._id} className={style.item}
                onClick={() => handleIngredientClick(ingredient)}>
                  <IngredientItem ingredient={ingredient} />
              </div>
            ))}
            {selectedIngredient && (
              <>
                <Modal title={selectedIngredient.name} onClose={closeModal}>
                  <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
              </>
            )}
          </div>
        </div>
          ),
      )}
    </div>
  );
};
