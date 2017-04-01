import React from 'react';

//import './money-container.scss';

const RealMoneyIcon = '../../../../assets/img/table/svg/real-money-icon.svg';
const PlayMoneyIcon = '../../../../assets/img/table/svg/play-money-icon.svg';

// Using "Stateless Functional Components"
export default (props) => {
  return (
    <div className="money-container">
      <div className="money">
        <div className="money-icon-container on-table">
          <img className="money-icon-wrapper icon-wrapper" src={RealMoneyIcon} />
        </div>
        <span className="text">On Table:</span> <span className="text value">$784</span>
      </div>
      <div className="money">
        <div className="money-icon-container">
          <img className="money-icon-wrapper icon-wrapper" src={PlayMoneyIcon} />
        </div>
        <span className="text">Off Table:</span> <span className="text value"> $784</span>
      </div>
    </div>
  );
}
