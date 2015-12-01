import React from 'react';

class QuestionItem extends React.Component {
    render() {
        let answers = this.props.answers.map((a, index) => {
            return (
                <tr key={ index } className={ a.correct ? "success" : "" }  >
                    <td className="col-sm-2"><small>#{ index + 1 }</small></td>
                    <td className="col-sm-8">{ a.text }</td>
                    <td className="col-sm-2"><i className={ a.correct ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove" }></i></td>
                </tr>
            )
        });
        let selectionIcon = (
            <span className={ this.props.selected ? "label label-info pull-right" : "label label-default pull-right" } style={{ display: (this.props.selected === undefined ? "none" : "inline") }}><i className={ this.props.selected ? "glyphicon glyphicon-ok-circle" : "glyphicon glyphicon-ban-circle" }></i></span>
        );
        return (
            <div className="col-sm-3">
                <div className={ "panel panel-question " + (this.props.selected ? "panel-info" : "panel-default") } onClick={ this.props.toggle !== undefined ? this.props.toggle.bind(null, this.props.id) : null } style={{ 'cursor': 'hand', 'cursor': 'pointer' }}>
                    <div className="panel-heading">
                        <h4>{ selectionIcon }{ this.props.text }</h4>
                    </div>
                    <table className="table">
                        <tbody>
                            { answers }
                        </tbody>
                    </table>
                    <div className="panel-footer">
                        { this.props.categories.map((c, index) => { return ( index > 0 ? ', ' : '' ) + c }) }
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionItem;
