import React from 'react';

class StudentQuestion extends React.Component {
    render() {
        let answers = this.props.question.answers;
        let correctAnswers = answers.reduce((count, answer) => {
            return count + (answer.correct ? 1 : 0);
        }, 0);
        let renderAnswers = answers.map((a, index) => {
            let rowClass = "row-answer";
            if (this.props.submitted) {
                if (a.selected && a.correct) {
                    rowClass = rowClass + " success";
                } else if (a.correct) {
                    rowClass = rowClass + " danger";
                }
            } else if (a.selected) {
                rowClass = rowClass + " active";
            }
            return (
                <tr key={ a.id } className={ rowClass } onClick={ this.props.selectAnswer.bind(null, this.props.index, index) } >
                    <td className="col-sm-12">
                        <i className={ "glyphicon glyphicon-" + (a.selected ? "check" : "unchecked") }></i> <span dangerouslySetInnerHTML={{ __html: a.text }}></span>
                    </td>
                </tr>
            );
        });
        return (
            <div className="panel panel-primary">
                <div className="panel-heading" dangerouslySetInnerHTML={{ __html: this.props.question.text }}></div>
                <div className="panel-body">
                    { correctAnswers > 1 ? "Check all that apply (no more than " + correctAnswers + ")." : "Choose one." }
                </div>
                <table className="table">
                    <tbody>
                        { renderAnswers }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentQuestion;
