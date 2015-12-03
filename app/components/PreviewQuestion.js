import React from 'react';

class PreviewQuestion extends React.Component {
    render() {
        let answers = this.props.question.answers;
        let correctAnswers = answers.reduce((count, answer) => {
            return count + (answer.correct ? 1 : 0);
        }, 0);
        let renderAnswers = answers.map((a, index) => {
            return (
                <div key={ a.id } className={ correctAnswers > 1 ? "checkbox" : "radio" }>
                    <label>
                        <input type={ correctAnswers > 1 ? "checkbox" : "radio" } value={ index } />
                        <div dangerouslySetInnerHTML={{ __html: a.text }}></div>
                    </label>
                </div>
            );
        });
        return (
            <div className="panel panel-primary">
                <div className="panel-heading" dangerouslySetInnerHTML={{ __html: this.props.question.text }}></div>
                <div className="panel-body">
                    { correctAnswers > 1 ? "Check all that apply (no more than " + correctAnswers + ")." : "Choose one." }
                    { renderAnswers }
                </div>
            </div>
        );
    }
}

export default PreviewQuestion;
