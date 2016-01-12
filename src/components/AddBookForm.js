import React, { Component } from 'react';
import { Speciality } from 'components/speciality';
import { PDFViewer } from 'components/PDFViewer'

export class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.onChangeTypeHandler = this.onChangeTypeHandler.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeKeywords = this.onChangeKeywords.bind(this);
        this.onAddSpec = this.onAddSpec.bind(this);
        this.onRemoveSpec = this.onRemoveSpec.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeScale = this.onChangeScale.bind(this);
    }

    onChangeTypeHandler(event) {
        this.props.updatePreBookData({
            type: event.target.value
        });
    }

    onChangeName(event) {
        this.props.updatePreBookData({
            name: event.target.value
        });
    }
    
    onChangeAuthor(event) {
        this.props.updatePreBookData({
            author: event.target.value
        });
    }

    onChangeYear(event) {
        this.props.updatePreBookData({
            year: event.target.value
        });
    }

    onChangeKeywords(event) {
        this.props.updatePreBookData({
            keywords: event.target.value
        });
    }

    onAddSpec(spec) {
        let specs = this.props.data.specs;
        if (specs.indexOf(spec) === -1) {
            specs.push(spec);
        }
        this.props.updatePreBookData({
            specs: specs
        });
    }

    onRemoveSpec(spec) {
        let specs = this.props.data.specs;
        specs = specs.filter(function(candidate) {
            return candidate !== spec;
        });
        this.props.updatePreBookData({
            specs: specs
        });
    }

    onChangePage(page) {
        this.props.updatePreBookUI({
            page: page
        });
    }

    onChangeScale(scale) {
        this.props.updatePreBookUI({
            scale: scale
        });
    }
    
    onSaveClick() {
        this.props.addBook(this.props.data);
    }
    
    onCancelClick() {
        console.log("Cancel");
    }

    render() {
        return (
            <div className="add-book-form">
                <div className="add-book-form__left">
                    <div className="add-book-form__group">
                        <input type="radio" name="type" value="book" id="book" checked={this.props.data.type === "book"} onChange={this.onChangeTypeHandler} />
                        <label htmlFor="book">Книга</label><br/>
                        <input type="radio" name="type" value="material" id="material" checked={this.props.data.type === "material"} onChange={this.onChangeTypeHandler} />
                        <label htmlFor="material">Методический материал</label>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookName">Название книги</label>
                        <textarea rows="4" id="bookName" placeholder="Книга шифров" value={this.props.data.name} onChange={this.onChangeName}></textarea>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookAuthor">Автор</label>
                        <textarea rows="4" id="bookAuthor" placeholder="Саймон Сингх" value={this.props.data.author} onChange={this.onChangeAuthor}></textarea>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookYear">Год издания</label>
                        <input type="text" id="bookYear" placeholder="2007" value={this.props.data.year} onChange={this.onChangeYear} />
                    </div>
                    <div className={this.props.data.type === "book" ? "add-book-form__group" : "add-book-form__hidden-group"}>
                        <label htmlFor="bookKeywords">Ключевые слова</label>
                        <input type="text" id="bookKeywords" placeholder="криптография, шифры" value={this.props.data.keywords} onChange={this.onChangeKeywords} />
                    </div>
                    <div className={this.props.data.type === "material" ? "add-book-form__group" : "add-book-form__hidden-group"}>
                        <label htmlFor="bookSpecs">Специальности</label><br/>

                        <Speciality name="Почтовая связь" onAddSpec={this.onAddSpec} onRemoveSpec={this.onRemoveSpec} />
                        <Speciality name="Экономика и управление на предприятии" onAddSpec={this.onAddSpec} onRemoveSpec={this.onRemoveSpec} />
                        <Speciality name="Маркетинг" onAddSpec={this.onAddSpec} onRemoveSpec={this.onRemoveSpec} />
                        <Speciality name="Сети телекоммуникаций" onAddSpec={this.onAddSpec} onRemoveSpec={this.onRemoveSpec} />
                    </div>

                    <div className="add-book-form__group">
                        <button className="button button-success" onClick={this.onSaveClick}>Сохранить</button>
                        <button className="button button-danger" onClick={this.onCancelClick}>Отмена</button>
                    </div>
                </div>
                <div className="add-book-form__right">
                    <PDFViewer file="documents/1.pdf" page={this.props.ui.page} scale={this.props.ui.scale} onChangePage={this.onChangePage} onChangeScale={this.onChangeScale} />
                </div>
            </div>
        );
    }
}