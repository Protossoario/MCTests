import React from 'react';

class PreviewQuestion extends React.Component {
    render() {
        return (
            <div class="col-sm-6">
                <h4>Question text:</h4>
                <ul class="list-group">
                    <li class="list-group-item">Answer #1</li>
                    <li class="list-group-item list-group-item-success">Answer #2</li>
                    <li class="list-group-item">Answer #3</li>
                    <li class="list-group-item">Answer #4</li>
                </ul>
            </div>
        );
    }
}

export default PreviewQuestion;
