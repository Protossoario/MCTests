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

    render() {
        return (
            <div>
                <div className="page-header col-xs-12">
                    <h3><i className="glyphicon glyphicon-th-list"></i> Question Catalogue</h3>
                </div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="categories">Filter by category</label>
                        <input className="form-control" type="text" id="categories" placeholder="Type the tag names separated by commas (e.g. math, geometry, physics)" />
                    </div>
                    <QuestionCatalogue questions={ this.state.questions } toggleQuestion={ AddTestActions.toggleQuestionSelected } />
                </div>
            </div>
        );
    }
}

export default AddTest;
