import React from 'react';
import QuestionItem from './QuestionItem';

class QuestionCatalogue extends React.Component {
    render() {
        let questions = this.props.questions.map((q) => {
            return (
                <QuestionItem key={ q.id } text={ q.text } answers={ q.answers } categories={ q.categories } toggle={ this.props.toggleQuestion } selected={ q.selected } id={ q.id } />
            );
        });
        let questionRows = [];
        let perRow = 4;
        for (let i = 0; i < questions.length; i += perRow) {
            questionRows.push(
                <div key={ i } className="row">
                    { questions.slice(i, i + perRow) }
                </div>
            );
        }
        return (
            <div>
                { questionRows }
            </div>
        );
    }
}

export default QuestionCatalogue;
