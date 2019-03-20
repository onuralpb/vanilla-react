/* eslint-disable array-callback-return */
import React, {Component} from 'react';
import Basket from './basket';
import {withRouter} from 'react-router-dom';

class Header extends Component {
  render () {
    const list = this.props.products.list;
    // const location = this.props.location.pathname;
    return (
      <div className="headerContent">
        <div className="row justify-content-between align-items-end">
          <div className="col-6">Product Count : {list.length}</div>
          <div className="col-6 d-inline-flex justify-content-end">
            {/* {location === '/products' && <Basket {...this.props} />} */}
            <Basket {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter (Header);
