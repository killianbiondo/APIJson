import React from 'react';

const ButtonComponent = ({ articleId, onClick, children }) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};

export default ButtonComponent;
