import React from 'react';

//import './money-container.scss';

import RealMoneyIcon from '../../../../assets/img/table/svg/real-money-icon.svg';
import PlayMoneyIcon from '../../../../assets/img/table/svg/play-money-icon.svg';

// Using "Stateless Functional Components"
export default (props) => {
  return (
    <div className="money-container">
      <div className="money">
        <div className="money-icon-container">
          <div className="money-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${RealMoneyIcon})`}}></div>
        </div>
        <span className="text">On Table:</span> <span className="text value">$784</span>
      </div>
      <div className="money">
        <div className="money-icon-container">
          <div className="money-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayMoneyIcon})`}}></div>
        </div>
        <span className="text">Off Table:</span> <span className="text value"> $784</span>
      </div>
    </div>
  );
}
