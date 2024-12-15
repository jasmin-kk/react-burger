import React, { FC, useMemo, useRef, useEffect } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../utils/data';
import style from './ingredients-group.module.css';
import { Link, useLocation } from 'react-router-dom';

interface IngredientsGroupProps {
  ingredients: Ingredient[];
  ingredientCounts: Record<string, number>;
  onTabChange: (tab: string) => void;
}

export const IngredientsGroup: FC<IngredientsGroupProps> = ({
  ingredients,
  ingredientCounts,
  onTabChange,
}) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const location = useLocation();

  const handleScroll = () => {
    const scrollPosition = groupRef.current?.scrollTop || 0;

    for (const type of order) {
      const section = sectionRefs.current[type];
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;
        if (isVisible) {
          onTabChange(type);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const groupElement = groupRef.current;
    if (groupElement) {
      groupElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (groupElement) {
        groupElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={groupRef} className={style.scroll}>
      {order.map(
        (type) =>
          groupedIngredients[type] && (
            <div
              key={type}
              ref={(el) => (sectionRefs.current[type] = el)}
              className={style.block}
            >
              <h2 className="text text_type_main-medium">
                {ingredientTypeTitles[type]}
              </h2>
              <div className={style.list}>
                {groupedIngredients[type].map((ingredient) => (
                  <Link
                    key={ingredient._id}
                    to={`/ingredients/${ingredient._id}`}
                    state={{
                      backgroundLocation: { location },
                      ingredient: ingredient,
                    }}
                    data-testid="ingredient-item"
                    className={style.item}
                  >
                    <IngredientItem
                      ingredient={ingredient}
                      count={ingredientCounts[ingredient._id] || 0}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};
