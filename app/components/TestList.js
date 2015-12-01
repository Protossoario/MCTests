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
        console.log(this.state.tests);
        let tests = this.state.tests.map((t) => {
            let timeEstimation = t.questionIds.length * 1;
            return (
                <Link to={ '/tests/' + t.testIdentifier } key={ t.testIdentifier } className="list-group-item animated fadeIn">
                    <h4 className="list-group-item-heading"><strong>{ t.testIdentifier }</strong></h4>
                    <p className="list-group-item-text">Estimated length: <strong>{ timeEstimation + (timeEstimation == 1 ? ' minute' : ' minutes') }</strong></p>
                    <p className="list-group-item-text">Questions: <span className="badge pull-right">{ t.questionIds.length }</span></p>
                </Link>
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
