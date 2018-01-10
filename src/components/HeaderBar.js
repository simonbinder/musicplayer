import React from 'react';
import '../assets/Header.scss';
import { Link } from 'react-router';

const HeaderBar = props => {

  const {
    onLogoTo,
    content,
    searchOnChange,
    value,
    searchBarActive
  } = props;

  return <div className="c-header">
    <Link to={onLogoTo}>
      <div className="c-header__logo">Musicplayer</div>
    </Link>

    { searchBarActive ? <input
      type="text"
      className="c-header__search"
      placeholder="Insert your song title"
      value={value}
      onChange={ ev => searchOnChange(ev) }
    /> : null }

    { content.map((dropdown, key) => {
      return <div key={key} className="c-header__dropdown">
        { dropdown.title }
        <div className="c-header__dropdown__content">
          { dropdown.childs.map((child, childKey) => {

            const childProps = {
              key: childKey,
              className: 'c-header__dropdown__field',
            };

            switch(child.type) {
              case 'link':
                return <Link {...childProps} to={child.to}>{child.title}</Link>
              case 'action':
                return <div {...childProps} onClick={ child.onClick }>{child.title}</div>
            }
          })}
        </div>
      </div>
    }) }
  </div>;
};

export default HeaderBar;
