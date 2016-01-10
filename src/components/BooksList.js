import React, { Component } from 'react';
import { Link } from 'react-router';

export class BooksList extends Component {
	
	static propTypes = {
		books: React.PropTypes.array
	};

	render() {
		let { books } = this.props;
		return (
			<table className="booksList">
				<tbody>
					{
						books.map((book, index) => 
							<tr className={index%2 === 0 ? "odd" : "even"} key={book.id}>
								<td className="textLeft">
                                    <Link to={`book/${book.id}`}>
                                        {book.author} - {book.name}, {book.year}
                                    </Link>
                                </td>
							</tr>
						)
					}
				</tbody>
			</table>
		);
	}
}