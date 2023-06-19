import './TransactionCard.scss';
import React from 'react';

function TransactionCard({ transaction }) {
  const { name, finance, amount, category } = transaction;

  const mathSign = category.id === 119 ? '+' : '-';
  const amountStyle = category.id === 119 ? 'card__amount_earn' : 'card__amount_spending';

  return (
    <li className="card">
      <div className="card__block">
        <img className="card__category" src={category.image_url} alt={category.name} />
        <p className="card__header">
          {category.name}
          <span className="card__text">{name}</span>
        </p>
      </div>

      <div className="card__block">
        <img className="card__bank-img" src={finance.image} alt={finance.name} />
        <p className="card__text">{finance.name}</p>
      </div>

      <div className="card__block">
        <p className={`card__amount ${amountStyle}`}>
          {mathSign}
          {amount}₽
        </p>
      </div>

      <div className="card__block card__button-block">
        <button type="button" aria-label="Изменить" className="card__button card__button_edit" />
        <button type="button" aria-label="Удалить" className="card__button card__button_delete" />
        <button type="button" aria-label="Повторить" className="card__button card__button_copy" />
      </div>
    </li>
  );
}

export default React.memo(TransactionCard);
