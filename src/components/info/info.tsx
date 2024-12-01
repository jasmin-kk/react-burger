import React, { FC } from 'react';
import style from './info.module.css';

export const Info: FC = () => {
  return (
    <div>
      <div className={style.ready}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <p className={`text text_type_digits-default mb-2 ${style.color}`}>
            034533
          </p>
          <p className={`text text_type_digits-default mb-2 ${style.color}`}>
            034533
          </p>
          <p className={`text text_type_digits-default mb-2 ${style.color}`}>
            034533
          </p>
          <p className={`text text_type_digits-default mb-2 ${style.color}`}>
            034533
          </p>
          <p className={`text text_type_digits-default mb-2 ${style.color}`}>
            034533
          </p>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <p className="text text_type_digits-default mb-2">034533</p>
          <p className="text text_type_digits-default mb-2">034533</p>
          <p className="text text_type_digits-default mb-2">034533</p>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`text text_type_digits-large mb-15`}>28 752</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">138</p>
    </div>
  );
};
