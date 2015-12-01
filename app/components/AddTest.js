import React from 'react';
import AddTestStore from '../stores/AddTestStore';
import AddTestActions from '../actions/AddTestActions';
import QuestionCatalogue from './QuestionCatalogue';

class AddTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddTestStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddTestStore.listen(this.onChange);
        AddTestActions.getAllQuestions();
    }

    componentWillUnmount() {
        AddTestStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        var testIdentifier = this.state.testIdentifier;
        // Filter out questions which are not selected, then return an array of their ids
        var questionIds = this.state.questions.filter((q) => { return q.selected; }).map((q) => { return q.id; });

        var valid = true;

        // Check if test identifier conforms to the valid format
        if (!/^\w{5,}-\d{4}-\d{2}-\d{2}/.test(testIdentifier)) {
            AddTestActions.invalidTestIdentifier();
            this.refs.testIdentifier.focus();
            valid = false;
        }

        if (questionIds.length == 0) {
            AddTestActions.invalidNumberOfQuestions();
            valid = false;
        }

        if (valid) {
            AddTestActions.addTest(testIdentifier, questionIds);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading"><i className="glyphicon glyphicon-plus"></i> Create a new Test</div>
                        <div className="panel-body">
                            <div className={ "form-group " + this.state.testIdentifierState }>
                                <label htmlFor="identifier">Test identifier:</label>
                                <input className="form-control" type="text" ref="testIdentifier" id="identifier" value={ this.state.testIdentifier } onChange={ AddTestActions.updateIdentifier } placeholder="Input an identifier for the test (e.g. 'CE902-2015-12-09')" />
                                <span className="help-block">{ this.state.testIdentifierHelpBlock ? this.state.testIdentifierHelpBlock : "The identifier must consist of a module name that's at least 5 characters long, a dash, and date in the format 'YYYY-MM-DD'." }</span>
                            </div>
                            <button className="btn btn-primary" onClick={ this.handleSubmit.bind(this) } ><i className="glyphicon glyphicon-ok"></i> Submit</button>
                        </div>
                        <div className="panel-heading"><i className="glyphicon glyphicon-th-list"></i> Question Catalogue</div>
                        <div className="panel-body">
                            <div className={ "form-group " + this.state.questionsState }>
                                <label htmlFor="categories">Filter by category</label>
                                <input className="form-control" type="text" id="categories" placeholder="Type the tag names separated by commas (e.g. math, geometry, physics)" />
                                <span className="help-block">{ this.state.questionsHelpBlock }</span>
                            </div>
                            <QuestionCatalogue questions={ this.state.questions } toggleQuestion={ AddTestActions.toggleQuestionSelected } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTest;
