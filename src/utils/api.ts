export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = async () => {
  const response = await fetch(`${BASE_URL}/ingredients`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();
  return data.data;
};
