import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './SampleComponent.scss';

class SampleComponent extends Component {

  render() {

    return (
      <p styleName='root'>
        It <span styleName='underlined'>Works!</span>  
      </p>
    );

  }

}

export default CSSModules(SampleComponent, Styles);
