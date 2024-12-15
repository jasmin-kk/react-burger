import reducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  updateIngredientOrder,
} from './burger-constructor';
import { Ingredient } from '../utils/data';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

describe('burgerConstructorSlice', () => {
  const initialState = {
    ingredients: [],
    ingredientCounts: {},
  };

  it('should return the initial state when called with undefined', () => {
    expect(reducer(undefined, { type: 'test' })).toEqual(initialState);
  });

  it('should handle addIngredient', () => {
    const ingredient: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 150,
      price: 50,
      image: 'bacon.jpg',
      image_mobile: 'bacon-mobile.jpg',
      image_large: 'bacon-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };

    const nextState = reducer(initialState, addIngredient(ingredient));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual({
      ...ingredient,
      id: 'test-uuid',
    });
    expect(nextState.ingredientCounts['ingredient-1']).toBe(1);
  });

  it('should handle addIngredient with bun', () => {
    const bun: Ingredient = {
      _id: 'bun-1',
      name: 'Bun Top',
      type: 'bun',
      proteins: 5,
      fat: 10,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'bun-top.jpg',
      image_mobile: 'bun-top-mobile.jpg',
      image_large: 'bun-top-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };

    const nextState = reducer(initialState, addIngredient(bun));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual({
      ...bun,
      id: 'test-uuid',
    });
    expect(nextState.ingredientCounts['bun-1']).toBe(2);
  });

  it('should handle removeIngredient', () => {
    const ingredient: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 150,
      price: 50,
      image: 'bacon.jpg',
      image_mobile: 'bacon-mobile.jpg',
      image_large: 'bacon-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };
    const bun: Ingredient = {
      _id: 'bun-1',
      name: 'Bun Top',
      type: 'bun',
      proteins: 5,
      fat: 10,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'bun-top.jpg',
      image_mobile: 'bun-top-mobile.jpg',
      image_large: 'bun-top-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };

    let state = reducer(initialState, addIngredient(ingredient));
    state = reducer(state, addIngredient(bun));

    const nextState = reducer(state, removeIngredient('ingredient-1'));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredientCounts['ingredient-1']).toBe(0);
    expect(nextState.ingredients[0]._id).toBe('bun-1');
  });

  it('should handle clearConstructor', () => {
    const ingredient: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 150,
      price: 50,
      image: 'bacon.jpg',
      image_mobile: 'bacon-mobile.jpg',
      image_large: 'bacon-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };
    const bun: Ingredient = {
      _id: 'bun-1',
      name: 'Bun Top',
      type: 'bun',
      proteins: 5,
      fat: 10,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'bun-top.jpg',
      image_mobile: 'bun-top-mobile.jpg',
      image_large: 'bun-top-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };

    let state = reducer(initialState, addIngredient(ingredient));
    state = reducer(state, addIngredient(bun));

    const nextState = reducer(state, clearConstructor());

    expect(nextState).toEqual(initialState);
  });

  it('should handle updateIngredientOrder', () => {
    const ingredient1: Ingredient = {
      _id: 'ingredient-1',
      name: 'Bacon',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 150,
      price: 50,
      image: 'bacon.jpg',
      image_mobile: 'bacon-mobile.jpg',
      image_large: 'bacon-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };
    const ingredient2: Ingredient = {
      _id: 'ingredient-2',
      name: 'Lettuce',
      type: 'main',
      proteins: 2,
      fat: 1,
      carbohydrates: 5,
      calories: 20,
      price: 30,
      image: 'lettuce.jpg',
      image_mobile: 'lettuce-mobile.jpg',
      image_large: 'lettuce-large.jpg',
      __v: 0,
      id: 'test-uuid',
    };

    const state = reducer(initialState, addIngredient(ingredient1));
    const updatedState = reducer(state, addIngredient(ingredient2));

    const newOrder = [ingredient2, ingredient1];

    const nextState = reducer(updatedState, updateIngredientOrder(newOrder));

    expect(nextState.ingredients).toEqual(newOrder);
  });
});
