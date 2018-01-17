import React from 'react';
import '../assets/Tooltip.scss';

const Tooltip = props => {

  const { items } = props;

  return <div className="o-tooltip">
    { items.map((item, key) => {
      return <div key={key} className="o-tooltip__item" onClick={ item.onClick }>{item.title}</div>
    }) }
  </div>
};

export default Tooltip;
