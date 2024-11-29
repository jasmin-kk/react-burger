export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при загрузке данных');
  }
  return response.json();
};
