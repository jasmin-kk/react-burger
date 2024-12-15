import reducer, { fetchIngredients } from './ingredients';
import { Ingredient } from '../utils/data';

jest.mock('../utils/api', () => ({
  ...jest.requireActual('../utils/api'),
  checkResponse: jest.fn(),
}));

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when called with undefined', () => {
    expect(reducer(undefined, { type: 'test' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const nextState = reducer(
      initialState,
      fetchIngredients.pending('fetchIngredients', undefined)
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const ingredients: Ingredient[] = [
      {
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
      },
      {
        _id: 'ingredient-2',
        name: 'Lettuce',
        type: 'main',
        proteins: 2,
        fat: 0.5,
        carbohydrates: 1,
        calories: 10,
        price: 5,
        image: 'lettuce-image-url',
        image_mobile: 'lettuce-image-mobile-url',
        image_large: 'lettuce-image-large-url',
        __v: 0,
        id: 'lettuce-id',
      },
    ];

    const nextState = reducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, 'fetchIngredients', undefined)
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.ingredients).toEqual(ingredients);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const nextState = reducer(
      initialState,
      fetchIngredients.rejected(
        new Error(errorMessage),
        'fetchIngredients',
        undefined
      )
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.ingredients).toEqual([]);
    expect(nextState.error).toBe(errorMessage);
  });
});
