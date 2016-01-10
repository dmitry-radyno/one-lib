import React, { Component } from 'react';
import { Speciality } from 'components/speciality';
import { PDFViewer } from 'components/PDFViewer'

export class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "book",
            name: "",
            author: "",
            year: "",
            keywords: "",
            specs: [],
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
    }

    onChangeTypeHandler(event) {
        this.setState(Object.assign(this.state, {
            type: event.target.value
        }));
    }

    onChangeName(event) {
        this.setState(Object.assign(this.state, {
            name: event.target.value
        }));
    }
    
    onChangeAuthor(event) {
        this.setState(Object.assign(this.state, {
            author: event.target.value
        }));
    }
    
    onChangeYear(event) {
        this.setState(Object.assign(this.state, {
            year: event.target.value
        }));
    }

    onChangeKeywords(event) {
        this.setState(Object.assign(this.state, {
            keywords: event.target.value
        }));
    }

    onAddSpec(spec) {
        let specs = this.state.specs;
        if (specs.indexOf(spec) === -1) {
            specs.push(spec);
        }
        this.setState(Object.assign(this.state, {
            specs: specs
        }));
    }
    
    onRemoveSpec(spec) {
        let specs = this.state.specs;
        specs = specs.filter(function(candidate) {
            return candidate !== spec;
        });
        this.setState(Object.assign(this.state, {
            specs: specs
        }));
    }
    
    onSaveClick() {
        console.log("Save", this.state);
    }
    
    onCancelClick() {
        console.log("Cancel");
    }

    render() {
        return (
            <div className="add-book-form">
                <div className="add-book-form__left">
                    <div className="add-book-form__group">
                        <input type="radio" name="type" value="book" id="book" checked={this.state.type === "book"} onChange={this.onChangeTypeHandler} />
                        <label htmlFor="book">Книга</label><br/>
                        <input type="radio" name="type" value="material" id="material" checked={this.state.type === "material"} onChange={this.onChangeTypeHandler} />
                        <label htmlFor="material">Методический материал</label>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookName">Название книги</label>
                        <textarea rows="4" id="bookName" placeholder="Книга шифров" value={this.state.name} onChange={this.onChangeName}></textarea>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookAuthor">Автор</label>
                        <textarea rows="4" id="bookAuthor" placeholder="Саймон Сингх" value={this.state.author} onChange={this.onChangeAuthor}></textarea>
                    </div>
                    <div className="add-book-form__group">
                        <label htmlFor="bookYear">Год издания</label>
                        <input type="text" id="bookYear" placeholder="2007" value={this.state.year} onChange={this.onChangeYear} />
                    </div>
                    <div className={this.state.type === "book" ? "add-book-form__group" : "add-book-form__hidden-group"}>
                        <label htmlFor="bookKeywords">Ключевые слова</label>
                        <input type="text" id="bookKeywords" placeholder="криптография, шифры" value={this.state.keywords} onChange={this.onChangeKeywords} />
                    </div>
                    <div className={this.state.type === "material" ? "add-book-form__group" : "add-book-form__hidden-group"}>
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
                    <PDFViewer file="documents/1.pdf" />
                </div>
            </div>
        );
    }
}