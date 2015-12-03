import React from 'react';

class StudentQuestion extends React.Component {
    onChange() {
    }

    render() {
        let answers = this.props.question.answers;
        let correctAnswers = answers.reduce((count, answer) => {
            return count + (answer.correct ? 1 : 0);
        }, 0);
        let renderAnswers = answers.map((a, index) => {
            return (
                <div key={ a.id } className="row row-answer" onClick={ this.props.selectAnswer.bind(null, this.props.index, index) } >
                    <div className="col-sm-12">
                        <i className={ "glyphicon glyphicon-" + (a.selected ? "check" : "unchecked") }></i> { a.text }
                    </div>
                </div>
            );
        });
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    { this.props.question.text }
                </div>
                <div className="panel-body">
                    { correctAnswers > 1 ? "Check all that apply (no more than " + correctAnswers + ")." : "Choose one." }
                    { renderAnswers }
                </div>
            </div>
        );
    }
}

export default StudentQuestion;
