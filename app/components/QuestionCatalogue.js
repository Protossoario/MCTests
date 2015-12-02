import React from 'react';
import QuestionItem from './QuestionItem';

class QuestionCatalogue extends React.Component {
    matchFilter(question, regex) {
        console.log(question.categories.join());
        console.log(regex);
        return regex.test(question.categories.join());
    }

    renderQuestionRows(selectedQuestions, filteredQuestions) {
        let questionRows = [];
        let questionBuffer = [];
        let perRow = 4;
        for (let i = 0; i < selectedQuestions.length; i ++) {
            if (questionBuffer.length === perRow) {
                console.log(questionBuffer);
                questionRows.push(
                    <div key={ 'selected' + i } className="row">
                        { questionBuffer }
                    </div>
                );
                questionBuffer = [];
                console.log('Hello');
                console.log(questionBuffer);
                console.log(questionRows);
            }
            questionBuffer.push(selectedQuestions[i]);
        }
        for (let i = 0; i < filteredQuestions.length; i ++) {
            if (questionBuffer.length === perRow) {
                questionRows.push(
                    <div key={ 'filtered' + i } className="row">
                        { questionBuffer }
                    </div>
                );
                questionBuffer = [];
            }
            questionBuffer.push(filteredQuestions[i]);
        }
        questionRows.push(
            <div key={ 'last' } className="row">
                { questionBuffer }
            </div>
        );
        return questionRows;
    }

    render() {
        let selectedQuestions = [];
        let filteredQuestions = [];

        // Convert the user input into a regular expression to match any of the categories specified
        // 1. split the input by either commas or spaces
        // 2. then join the resulting array into a string, separating the tokens with the OR operator for regexes
        let filterRegex = new RegExp(this.props.filter.split(/\s|,/).join('|'), 'i');

        for (let i = 0; i < this.props.questions.length; i++) {
            let q = this.props.questions[i];
            let qRender = (<QuestionItem key={ q.id } text={ q.text } answers={ q.answers } categories={ q.categories } toggle={ this.props.toggleQuestion } selected={ q.selected } id={ q.id } />);
            if (q.selected) {
                selectedQuestions.push(qRender);
            } else if (this.matchFilter(q, filterRegex)) {
                filteredQuestions.push(qRender);
            }
        }

        if (filteredQuestions.length === 0) {
            this.props.noMatchAction();
        }

        return (
            <div>
                { this.renderQuestionRows(selectedQuestions, filteredQuestions) }
            </div>
        );
    }
}

export default QuestionCatalogue;
