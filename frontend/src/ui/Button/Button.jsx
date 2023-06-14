import './Button.scss';

export default function Button({
  variant,
  content,
  text,
  size,
  onClick,
  type,
  disabled,
  image,
  extraClass,
}) {
  const buttonClasses = `button ${extraClass} ${variant} ${size} ${disabled ? 'disabled' : ''} ${
    content === 'icon' ? 'rounded' : ''
  }`;

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick} type={type}>
      {content === 'text' && <span className="button-text">{text}</span>}
      {content === 'icon-text' && (
        <>
          <span className="button-icon">
            <img className="button-image" src={image} alt="Button icon" />
          </span>
          <span className="button-text">{text}</span>
        </>
      )}
      {content === 'icon' && (
        <span className="button-icon">
          <img className="button-image" src={image} alt="Button icon" />
        </span>
      )}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  content: 'text',
  size: 'small',
  onClick: () => {},
  type: 'button',
  disabled: false,
};

// import React from 'react';
// import './Button.scss';

// function Button({ variant, type, text, size, disabled, extraClass, onClick }) {
//   const buttonClasses = `button ${extraClass} ${variant} ${size} ${disabled ? 'disabled' : ''} ${
//     type === 'icon' ? 'rounded' : ''
//   } ${type === 'iconMinus' ? 'rounded' : ''}`;

//   return (
//     <button className={buttonClasses} disabled={disabled} onClick={onClick}>
//       {type === 'text' && <span className="button-text">{text}</span>}
//       {type === 'icon-text' && (
//         <>
//           <span className="button-icon"> </span>
//           <span className="button-text">{text}</span>
//         </>
//       )}
//       {type === 'icon' && <span className="button-icon"> </span>}
//       {type === 'iconMinus' && <span className="button-icon button-icon_minus"> </span>}
//     </button>
//   );
// }

// export default React.memo(Button);
