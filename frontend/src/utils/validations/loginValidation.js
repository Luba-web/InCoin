/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

import * as yup from 'yup';

const loginValidation = yup.object().shape({
  username: yup
    .string()
    .required('Поле Логин не может быть пустым')
    .min(2, 'Поле Логин не может быть короче 2 символов')
    .max(40, 'Поле Логин не может быть длиннее 25 символов')
    .test('username', 'Введите правильный логин', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_./+-]+$/.test(value);
      if (!isLogin) {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .required('Поле Пароль не может быть пустым')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль не может быть длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль должен содержать хотя бы один спецсимвол и не состоять только из цифр',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не может состоять только из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
});

export default loginValidation;