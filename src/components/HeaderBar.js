import React from 'react';
import '../assets/Header.scss';

const HeaderBar = props => {
  return <div className="c-header">
    <div className="c-header__logo">Logo</div>
    <input
      type="text"
      className="c-header__search"
      placeholder="Insert your song title" 
    />
    <div className="c-header__dropdown">
      Jannik Lorenz
      <div className="c-header__dropdown__content">
        <div className="c-header__dropdown__field">Account</div>
        <div className="c-header__dropdown__field">Logout</div>
      </div>
    </div>
  </div>;
};

export default HeaderBar;
