import React, { Component } from 'react';
import uuid from 'utils/uuid';

export class Speciality extends Component {
    static propTypes = {
        name: React.PropTypes.string,
        onAddSpec: React.PropTypes.func,
        onRemoveSpec: React.PropTypes.func,
    };
    
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        var value = event.target.value,
            checked = event.target.checked;

        if (checked) {
            this.props.onAddSpec(value);
        } else {
            this.props.onRemoveSpec(value);
        }
    }

    render() {
        var id = uuid("bookSpec");
        return (
            <div>
                <input type="checkbox" value={this.props.name} onChange={this.onChangeHandler} id={id} />
                <label htmlFor={id}>{this.props.name}</label><br/>
            </div>
        );
    }
}