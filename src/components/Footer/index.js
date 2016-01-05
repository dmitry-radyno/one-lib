import React, { Component } from 'react';

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
