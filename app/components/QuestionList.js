import React from 'react';
import QuestionListStore from '../stores/QuestionListStore';
import QuestionListActions from '../actions/QuestionListActions';
import QuestionItem from './QuestionItem';

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = QuestionListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QuestionListStore.listen(this.onChange);
        QuestionListActions.getAllQuestions();
    }

    componentWillUnmount() {
        QuestionListStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let questions = this.state.questions.map((q) => {
            return (
                <QuestionItem key={ q.id } text={ q.text } answers={ q.answers } categories={ q.categories }></QuestionItem>
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
};

export default QuestionList;
