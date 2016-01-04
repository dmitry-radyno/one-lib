import React, { Component } from 'react';
import { Link } from 'react-router';

export class BooksList extends Component {
	
	static propTypes = {
		books: React.PropTypes.array
	}

	render() {
		let { books } = this.props;
		return (
			<table className="booksList">
				<tbody>
					<tr>
						<th>#</th>
						<th>Год</th>
						<th className="textRight">Ключевые слова/Специальности</th>
					</tr>
					{
						books.map((book, index) => 
							<tr className={index%2 === 0 ? "odd" : "even"} key={book.id}>
								<td className="textLeft">{book.name}</td>
								<td>{book.year}</td>
								<td className="textRight">{book.keywords}</td>
							</tr>
						)
					}
				</tbody>
			</table>
		);
	}
}