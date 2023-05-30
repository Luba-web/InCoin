/* eslint-disable react/jsx-props-no-spreading */
import {  useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { registerUser } from '../../store/slices/registerSlice';
import registerValidation from '../../utils/validations/RegisterValidation';

export default function RegisterPopup({ onClose }) {
  // const [disableButton, setDisableButton] = useState(true);
  const dispatch = useDispatch();

  const isRegistration = useSelector((state) => state.registration.data);

  const handleEnterClick = () => {
    dispatch(toggleRegisterPopup(false));
    dispatch(toggleLoginPopup(true));
  };

  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   first_name: '',
  //   last_name: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  // eslint-disable-next-line camelcase
  // const { username, email, first_name, last_name, password } = formData;

  // const handleChange = (evt) => {
  //   setFormData({ ...formData, [evt.target.name]: evt.target.value });
  // };

  const handleRegistration = (userData) => {
    // evt.preventDefault();
    // Проверка на совпадение паролей
    // if (password === formData.confirmPassword) {
    // Отправка данных регистрации пользователя
    // eslint-disable-next-line camelcase
    // dispatch(registerUser({ username, email, first_name, last_name, password }));
    
    dispatch(registerUser(userData));
    // } else {
    // Пока такая обработка ошибки при несовпадении паролей
    //   console.log('Пароли не совпадают');
    // }
  };

  if (isRegistration) {
    dispatch(toggleRegisterPopup(false));
    dispatch(toggleLoginPopup(true));
  }

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     if (value.password != value.repeatPassword) {
  //       setMessage("Пароли не совпадают!");
  //       setDisableButton(true);
  //       return;
  //     } else 
  //     if (disableButton) {
  //       setDisableButton(false);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerValidation),
  });
  const password = useRef({});
  password.current = watch('password', ''); 

  return (
    <Popup onClose={onClose} popupSize="popup_m">
      <form className="form" onSubmit={handleSubmit(handleRegistration)}>
        <h2 className="form__header">Регистрация</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-login">
            Логин
            <input
            {...register('username')}
              id="RegisterPopup-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Ввести логин"
            />
          </label>
          <span
              className={`form__valid-message 
                        ${errors.username ? 'form__valid-message_active' : ''}`}
            >
              {errors?.username && errors?.username?.message}
            </span>
          <div
            className="form__tooltip"
            data-tooltip-id="login"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, _, ., +, -, без пробелов, минимальное количество символов - 2, максимальное - 25"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="login"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-email">
            E-mail
            <input
            {...register('email')}
              id="RegisterPopup-email"
              name="email"
              className="form__input"
              type="email"
              placeholder="Ввести e-mail"
            />
          </label>
            <span
              className={`form__valid-message 
                        ${errors.email ? 'form__valid-message_active' : ''}`}
            >
              {errors?.email && errors?.email?.message}
            </span>
          <div
            className="form__tooltip"
            data-tooltip-id="email"
            data-tooltip-content="Цифры, латинские буквы, специальные символы: -, _, .,  минимальное количество символов - 7, максимальное - 129"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="email"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-name">
            Имя
            <input
            {...register('first_name')}
              id="RegisterPopup-name"
              name="first_name"
              className="form__input"
              type="text"
              placeholder="Ввести имя"
            />
          </label>
            <span
              className={`form__valid-message 
                        ${errors.first_name ? 'form__valid-message_active' : ''}`}
            >
              {errors?.first_name && errors?.first_name?.message}
            </span>
          <div
            className="form__tooltip"
            data-tooltip-id="name"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="name"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-surname">
            Фамилия
            <input
            {...register('last_name')}
              id="RegisterPopup-surname"
              name="last_name"
              className="form__input"
              type="text"
              placeholder="Ввести фамилию"
            />
          </label>
            <span
              className={`form__valid-message 
                        ${errors.last_name ? 'form__valid-message_active' : ''}`}
            >
              {errors?.last_name && errors?.last_name?.message}
            </span>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-password">
            Пароль
            <input
            {...register('password')}
              id="RegisterPopup-password"
              name="password"
              className="form__input"
              type="password"
            />
          </label>
            <span
              className={`form__valid-message 
                        ${errors.password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.password && errors?.password?.message}
            </span>
          <div
            className="form__tooltip"
            data-tooltip-id="password"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="password"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-repeatPassword">
            Введите пароль повторно
            <input
            {...register('confirmPassword')}
              id="RegisterPopup-repeatPassword"
              name="confirmPassword"
              className="form__input"
              type="password"
              placeholder="Повторить пароль"
            />
          </label>
            <span
              className={`form__valid-message 
                        ${errors.confirmPassword ? 'form__valid-message_active' : ''}`}
            >
              {errors?.confirmPassword && errors?.confirmPassword?.message}
            </span>
        </div>

        <label htmlFor="RegisterPopup-confirm" className="form__checkbox-label form__text">
          Я даю своё согласие на обработку персональных данных и ознакомился c
          <NavLink to="/"> Политикой o конфиденциальности </NavLink>
          <input type="checkbox" id="RegisterPopup-confirm" className="form__checkbox" />
        </label>

        <div className="form__button-wrapper">
          <p className="form__text">
            {'У вас уже есть аккаунт? '}
            <button type="button" className="form__button_text" onClick={handleEnterClick}>
              Войти
            </button>
          </p>

          <button type="submit" 
          className={`form__button form__button_submit
          ${(!isValid || !errors) && 'form__button:disabled'}`}
            disabled={!isValid}
          >
            Зарегестрироваться
          </button>
        </div>
      </form>
    </Popup>
  );
}