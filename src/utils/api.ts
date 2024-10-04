const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();
  return data.data;
};
