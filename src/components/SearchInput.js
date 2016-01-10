import React, { Component } from 'react';

export class SearchInput extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.state = {
            keyword: ""
        };
    }
    
    static propTypes = {
        onChange: React.PropTypes.func
    };
    
    onChangeHandler(event) {
        this.state.keyword = event.target.value;
        this.props.onChange(this.state.keyword);
    }
    
    onClickHandler() {
        this.props.onChange(this.state.keyword);
    }

	render() {
		return (
			<div className="search-input">
				<input type="text" onChange={this.onChangeHandler} placeholder="Название, автор, ключевые слова, специальность..." />
				<button onClick={this.onClickHandler}>Искать</button>
			</div>
		);
	}
}