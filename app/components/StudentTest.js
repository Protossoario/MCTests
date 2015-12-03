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
        let questions = this.state.questions.map((q, index) => {
            return (
                <StudentQuestion key={ q.id } question={ q } index={ index } selectAnswer={ StudentTestActions.updateQuestionAnswer } />
            );
        });
        return (
            <div className="container">
                { questions }
                <button className="btn btn-primary">Submit</button>
            </div>
        );
    }
}

export default StudentTest;
