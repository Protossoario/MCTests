import React from 'react';
import QuestionList from './QuestionList';

class Home extends React.Component {
  render() {
    return (
        <div className="container">
            <QuestionList />
        </div>
    );
  }
}

export default Home;
