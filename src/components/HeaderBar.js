import React from 'react';
import '../assets/Header.scss';
import { Link } from 'react-router';

const HeaderBar = props => {

  const {
    onLogoTo,
    content,
    searchOnChange,
    value
  } = props;

  return <div className="c-header row">


    <div className="col-lg-2 col-md-2 col-sm-2">
    <Link to={onLogoTo}>
      <div className="c-header__logo"></div>
    </Link>
    </div>

<div className="col-lg-8 col-md-8 col-sm-10">
    <div className="input-group c-header__search">
          <input
            type="text"
            className="form-control"
            placeholder="Insert your song title"
            value={value}
            onChange={ ev => searchOnChange(ev) }
          />
          <span className="input-group-addon">
            <button
              type="submit">
                <span className="glyphicon glyphicon-search"></span>
            </button>
           </span>
    </div>
</div>

    { content.map((dropdown, key) => {
      return <div key={key} className="c-header__dropdown col-lg-2 col-md-2 col-sm-12">
        <div className="c-header__dropdown_title">{ dropdown.title }</div>
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
