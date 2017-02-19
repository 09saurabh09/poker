import React from 'react';
if(process.env.WEBPACK) {
  require( './game-pot.scss' );
}
export default class GamePot extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { potValue } = this.props;
    $(document).ready(function() {
      let borderLeft = 0, borderRight = 0, width = 0;
      if(potValue >= 0 && potValue <= 25) {
        borderLeft = potValue;
      } else if(potValue > 25 && potValue <= 75) {
        borderLeft = 25;
        width = 60* (potValue - 25)/50;
      } else if(potValue > 75 && potValue <= 100) {
        borderLeft = 25;
        width = 60;
        borderRight = potValue - 75;
      }
      $('.pot-filled').css({'border-left': borderLeft + 'px solid transparent',
                            'width': width + 'px',
                            'border-right': borderRight + 'px solid transparent'})
    });
  }
  render() {
    return (
      <div className="pot">
        <div className="triangle-bottomleft"></div>
        <div className="pot-container"><div className="pot-filled"></div></div>
        <div className="pot-text">
          <div>Total Pot</div>
          <div className="pot-value">{this.props.totalPot}</div>
          <div className="pot-percentage">{this.props.potValue}%</div>
        </div>
      </div>
    );
  }
}
