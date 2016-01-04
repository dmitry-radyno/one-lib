import React, { Component } from 'react';
import { Link } from 'react-router';

export class EntitiesList extends Component {

    static propTypes = {
        entities: React.PropTypes.object,
        dispatch: React.PropTypes.func,
        addEntity: React.PropTypes.func,
        removeEntity: React.PropTypes.func
    }

    state = {
        value: ""
    }

    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.removeClickHandler = this.removeClickHandler.bind(this);
    }

    changeHandler(event) {
        this.setState({
            value: event.target.value
        });
    }

    addClickHandler() {
        let newName = this.state.value;
        this.props.addEntity((new Date()).valueOf(), newName);

        this.setState({
            value: ""
        });
    }
    
    removeClickHandler(event) {
        this.props.removeEntity(event.target.id);
    }

    render() {
        const { entities } = this.props;
        let inputValue = this.state.value;

        return (
            <div>
                {
                    entities.data.map((item, index) => 
                        <div key={item.id}>
                            <Link to={`/book/${item.id}`}>{item.name}</Link>
                            <span onClick={this.removeClickHandler} id={item.id}>(Remove)</span>
                        </div>
                    )
                }
                <input type="text" onChange={this.changeHandler} value={inputValue} />
                <button onClick={this.addClickHandler}>Add new entity</button>
            </div>
        );
    }
}