import React from 'react';
import StudentTestStore from '../stores/StudentTestStore';
import StudentTestActions from '../actions/StudentTestActions';
import StudentQuestion from './StudentQuestion';

class StudentTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = StudentTestStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        StudentTestStore.listen(this.onChange);
        StudentTestActions.getTest(this.props.params.id);
    }

    componentWillUnmount() {
        StudentTestStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        // When URL path changes, fetch new test data
        if (prevProps.params.id !== this.props.params.id) {
            StudentTestActions.getTest(this.props.params.id);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let renderTestResult = '';
        if (this.state.submitted) {
            let result = 0;
            // compute the score weight for each question
            this.state.questions.forEach((q) => {
                let weight = 0;
                let correctAnswers = q.answers.reduce((count, a) => count + (a.correct ? 1 : 0), 0);
                if (correctAnswers > 1) {
                    // question has multiple right answers, so weight score = ratio of correct answers
                    q.answers.forEach((a) => weight += (a.selected == a.correct ? 1 : 0));
                    result += weight / q.answers.length;
                } else {
                    // question has one answer, so only if the answer is correct they get 1 point, else 0 points
                    q.answers.forEach((a) => weight += (a.selected && a.correct ? 1 : 0));
                    result += weight;
                }
            });
            // average the question weights to get the final score
            result /= this.state.questions.length;

            renderTestResult = (
                <div className="panel panel-default animated fadeIn">
                    <div className="panel-heading">Final Score: { result * 100 }%</div>
                </div>
            );
        }

        let questions = this.state.questions.map((q, index) => {
            return (
                <StudentQuestion key={ q.id } question={ q } index={ index } selectAnswer={ StudentTestActions.updateQuestionAnswer } submitted={ this.state.submitted } />
            );
        });
        return (
            <div className="container">
                { questions }
                <div className={ "form-group " + this.state.submitHelpBlockState }>
                    <button className="btn btn-primary" onClick={ StudentTestActions.submitTest } disabled={ this.state.submitted } >Submit</button>
                    <p className="help-block">{ this.state.submitHelpBlock }</p>
                </div>
                { renderTestResult }
            </div>
        );
    }
}

export default StudentTest;
