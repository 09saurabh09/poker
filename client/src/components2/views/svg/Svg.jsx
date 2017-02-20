import React, { PropTypes } from 'react';

export default class Svg extends React.Component {

  render() {
    const { markup, className} = this.props;
    const isBase64 = typeof markup === 'string' && markup.indexOf('data') === 0;
    return isBase64
      ? <img src={markup} className={ className } />
      : <span dangerouslySetInnerHTML={{ __html: markup }} className={ className }/>;
  }
}
