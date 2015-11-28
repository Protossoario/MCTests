import React from 'react';
import QuestionListStore from '../stores/QuestionListStore';
import QuestionListActions from '../actions/QuestionListActions';

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
            let answers = q.answers.map((a, index) => {
                return (
                    <tr key={ index } className={ a.correct ? "success" : "" }  >
                        <td className="col-sm-2"><small>#{ index + 1 }</small></td>
                        <td className="col-sm-8">{ a.text }</td>
                        <td className="col-sm-2"><i className={ a.correct ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove" }></i></td>
                    </tr>
                )
            });
            return (
                <div key={ q.id } className="col-sm-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>{ q.text }</h4>
                        </div>
                        <table className="table">
                            <tbody>
                                { answers }
                            </tbody>
                        </table>
                        <div className="panel-footer">
                            { q.categories.map((c, index) => { return ( index > 0 ? ', ' : '' ) + c }) }
                        </div>
                    </div>
                </div>
            )
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
