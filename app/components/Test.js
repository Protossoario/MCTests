import React from 'react';
import TestStore from '../stores/TestStore';
import TestActions from '../actions/TestActions';
import QuestionCatalogue from './QuestionCatalogue';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = TestStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TestStore.listen(this.onChange);
        TestActions.getTest(this.props.params.id);
    }

    componentWillUnmount() {
        TestStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        // When URL path changes, fetch new test data
        if (prevProps.params.id !== this.props.params.id) {
            TestActions.getTest(this.props.params.id);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit() {
        var testIdentifier = this.state.testIdentifier;
        // Filter out questions which are not selected and return an array of their ids
        var questionIds = this.state.questions.filter((q) => { return q.selected; }).map((q) => { return q.id; });

        if (questionIds.length === 0) {
            TestActions.invalidNumberOfQuestions();
        } else {
            TestActions.updateTest(testIdentifier, questionIds);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading"><i className="glyphicon glyphicon-wrench"></i> View / Edit Test</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="identifier">Test identifier:</label>
                                <input className="form-control" type="text" id="identifier" value={ this.state.testIdentifier } disabled />
                            </div>
                            <button className="btn btn-primary" onClick={ this.handleSubmit.bind(this) } ><i className="glyphicon glyphicon-ok"></i> Save</button>
                        </div>
                        <div className="panel-heading"><i className="glyphicon glyphicon-th-list"></i> Question Catalogue</div>
                        <div className="panel-body">
                            <div className={ "form-group " + this.state.questionsState }>
                                <label htmlFor="categories">Filter by category</label>
                                <input className="form-control" type="text" id="categories" placeholder="Type the tag names separated by commas (e.g. math, geometry, physics)" />
                                <span className="help-block">{ this.state.questionsHelpBlock }</span>
                            </div>
                            <QuestionCatalogue questions={ this.state.questions } toggleQuestion={ TestActions.toggleQuestionSelected } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Test;
