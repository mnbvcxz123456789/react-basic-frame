import React, { Component } from 'react';

import './Page1.css';

import test1 from './images/test1.png';

export default class Page1 extends Component {
    render() {
        return (
            <div className="page-box">
                this is Page1
                <img src={test1}/>
            </div>
        )
    }
}