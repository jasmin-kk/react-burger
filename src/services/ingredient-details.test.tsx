import reducer, {
  setIngredientDetails,
  clearIngredientDetails,
} from './ingredient-details';
import { Ingredient } from '../utils/data';

describe('ingredientDetailsSlice', () => {
  const initialState: Ingredient | null = null;

  it('should return the initial state when called with undefined', () => {
    expect(reducer(undefined, { type: 'test' })).toEqual(initialState);
  });

  it('should handle setIngredientDetails', () => {
    const ingredient: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 50,
      price: 40,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
      __v: 0,
      id: 'test-id',
    };

    const nextState = reducer(initialState, setIngredientDetails(ingredient));

    expect(nextState).toEqual(ingredient);
  });

  it('should handle clearIngredientDetails', () => {
    const ingredient: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 50,
      price: 40,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
      __v: 0,
      id: 'test-id',
    };

    const stateWithIngredient = reducer(
      initialState,
      setIngredientDetails(ingredient)
    );

    const nextState = reducer(stateWithIngredient, clearIngredientDetails());

    expect(nextState).toBeNull();
  });
});
