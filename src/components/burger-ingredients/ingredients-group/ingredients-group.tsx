import React, { FC, useMemo, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIngredientDetails,
  clearIngredientDetails,
} from '../../../services/ingredient-details';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../utils/data';
import style from './ingredients-group.module.css';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

interface IngredientsGroupProps {
  ingredients: Ingredient[];
  onTabChange: (tab: string) => void;
}

export const IngredientsGroup: FC<IngredientsGroupProps> = ({
  ingredients,
  onTabChange,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const dispatch = useDispatch();
  const groupRef = useRef<HTMLDivElement>(null);

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(setIngredientDetails(ingredient));
    setSelectedIngredient(ingredient);
    setModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setModalOpen(false);
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

  const handleScroll = () => {
    if (groupRef.current) {
      const sections = groupRef.current.querySelectorAll('h2');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < 100) {
          onTabChange(section.getAttribute('data-type') || 'bun');
        }
      });
    }
  };

  useEffect(() => {
    const currentRef = groupRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={groupRef}
      className={style.scroll}
      style={{ overflowY: 'auto', maxHeight: '500px' }}
    >
      {order.map(
        (type) =>
          groupedIngredients[type] && (
            <div key={type} className={style.block}>
              <h2 className="text text_type_main-medium" data-type={type}>
                {ingredientTypeTitles[type]}
              </h2>
              <div className={style.list}>
                {groupedIngredients[type].map((ingredient) => (
                  <div
                    key={ingredient._id}
                    className={style.item}
                    onClick={() => handleIngredientClick(ingredient)}
                  >
                    <IngredientItem ingredient={ingredient} />
                  </div>
                ))}
              </div>
            </div>
          )
      )}
      {isModalOpen && selectedIngredient && (
        <Modal title={selectedIngredient.name} onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </div>
  );
};
