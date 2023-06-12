export const RegExLogin = '[da-zA-Zа-яА-ЯЁё/_.+-]+';
export const RegExEmail = '[da-zA-Z_.@-]+';
export const RegExName = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExSurname = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExPassword = '[da-zA-Z_ .!"#$%&,-]+';
export const RegExPhone = '[d+()]+';
export const RegExSpendOperationName = '[a-zA-Zа-яА-ЯЁё]+';
export const RegExEarnOperationName = '[a-zA-Zа-яА-ЯЁё‐— -]+';
export const RegExOperationAmount = '[d]+';

export const RequirementsLogin =
  'Имя пользователя должно состоять только из латинских букв (в верхнем или нижнем регистре), цифр, символов(_ . + -) и иметь длину от 2 до 25 символов. Пожалуйста, не используйте пробелы или другие символы. Регистр букв не учитывается.';
export const RequirementsEmail =
  'Адрес электронной почты может содержать только цифры, латинские буквы и специальные символы (@ - _ .) и должен иметь длину от 7 до 129 символов.';
export const RequirementsPassword =
  'Длина пароля должна быть от 8 до 40 символов. Используйте как минимум одну прописную (заглавную) латинскую букву, строчную латинскую букву, цифру (но не только цифры) и специальные символы (пробел ! " # $ % & . ,). Пароль чувствителен к регистру.';
export const RequirementsNameAndSurname =
  'Личные данные пользователя могут содержать прописные и строчные буквы, пробел в середине, дефис и тире и должны иметь длину от 0 до 50 символов. Регистр букв не учитывается.';

export const arrCategoriesСommon = [
  {
    title: 'Общие',
    id: '1',
  },
  {
    title: 'Расходы',
    id: '2',
  },
  {
    title: 'Доходы',
    id: '3',
  },
];

export const arrCategoriesDate = [
  {
    title: 'День',
    id: '1',
  },
  {
    title: 'Неделя',
    id: '2',
  },
  {
    title: 'Месяц',
    id: '3',
  },
  {
    title: 'Год',
    id: '4',
  },
];

export const arrCategoriesWeek = [
  {
    title: 'Пн',
    id: '1',
  },
  {
    title: 'Вт',
    id: '2',
  },
  {
    title: 'Ср',
    id: '3',
  },
  {
    title: 'Чт',
    id: '4',
  },
  {
    title: 'Пт',
    id: '5',
  },
  {
    title: 'Сб',
    id: '6',
  },
  {
    title: 'Вс',
    id: '7',
  },
];
