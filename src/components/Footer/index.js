import React, { Component } from 'react';
//import 'bootstrap-webpack';

import { styles } from './footer.scss';

export class Footer extends Component {
    render() {
        return (
            <div className={`${styles}`}>
                I'm footer
            </div>
        );
    }
}
