import React, { Component } from 'react';

export class SearchInput extends Component {
	render() {
		return (
			<div className="search-input">
				<input type="text" placeholder="Название, автор, ключевые слова, специальность..." />
				<button>Поиск</button>
			</div>
		);
	}
}