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
            renderTestResult = (
                <div className="panel panel-info animated fadeIn">
                    <div className="panel-heading">Final Score: { this.state.finalScore * 100 }%</div>
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
                { renderTestResult }
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
