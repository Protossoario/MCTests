import React from 'react';
import {Link} from 'react-router';
import TestListStore from '../stores/TestListStore';
import TestListActions from '../actions/TestListActions';

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = TestListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TestListStore.listen(this.onChange);
        TestListActions.getAllTests();
    }

    componentWillUnmount() {
        TestListStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let tests = this.state.tests.map((t) => {
            return (
                <div key={ t.testIdentifier } className="list-group-item animated fadeIn">
                    <h4 className="list-group-item-heading"><strong>{ t.testIdentifier }</strong></h4>
                    <p className="list-group-item-text">Length: <strong>{ t.questionIds.length + (t.questionIds.length == 1 ? ' question' : ' questions') }</strong></p>
                    <br />
                    <div className="btn-group btn-group-justified" role="group" aria-label="...">
                        <Link to={ '/tests/' + t.testIdentifier } className="btn btn-warning" role="button"><i className="glyphicon glyphicon-edit"></i> Edit</Link>
                        <Link to={ '/students/' + t.testIdentifier } className="btn btn-info" role="button"><i className="glyphicon glyphicon-exclamation-sign"></i> Attempt</Link>
                        <Link to={ '/preview/' + t.testIdentifier } className="btn btn-primary" role="button"><i className="glyphicon glyphicon-eye-open"></i> Preview</Link>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="list-group">
                            { tests }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestList;
