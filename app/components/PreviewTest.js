import React from 'react';
import PreviewTestStore from '../stores/PreviewTestStore';
import PreviewTestActions from '../actions/PreviewTestActions';
import PreviewQuestion from './PreviewQuestion';

class PreviewTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = PreviewTestStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PreviewTestStore.listen(this.onChange);
        PreviewTestActions.getTest(this.props.params.id);
    }

    componentWillUnmount() {
        PreviewTestStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        // When URL path changes, fetch new test data
        if (prevProps.params.id !== this.props.params.id) {
            PreviewTestActions.getTest(this.props.params.id);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let questions = this.state.questions.map((q) => {
            return (
                <PreviewQuestion key={ q.id } question={ q } />
            );
        });
        return (
            <div className="container">
                { questions }
            </div>
        );
    }
}

export default PreviewTest;
