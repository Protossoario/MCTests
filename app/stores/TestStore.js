import alt from '../alt';
import TestActions from '../actions/TestActions';

class TestStore {
    constructor() {
        this.bindActions(TestActions);
        this.testIdentifier = '';
        this.questionIds = [];
        this.questions = [];
        this.questionsState = '';
        this.questionsHelpBlock = '';
    }

    onGetTestSuccess(data) {
        this.testIdentifier = data.testIdentifier;
        this.questionIds = data.questionIds;
    }

    onGetTestFail(message) {
        toastr.error(message);
    }

    onGetAllQuestionsSuccess(data) {
        this.questions = data.map((q) => {
            q.selected = this.questionIds.indexOf(q.id) !== -1;
            return q;
        });
    }

    onGetAllQuestionsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }

    onToggleQuestionSelected(id) {
        let found = false;
        let i = 0;
        while (!found && i < this.questions.length) {
            if (this.questions[i].id == id) {
                found = true;
                this.questions[i].selected = !this.questions[i].selected;
            }
            i++;
        }

        this.questionsState = '';
        this.questionsHelpBlock = '';
    }

    onUpdateTestSuccess(message) {
        this.questionsState = 'has-success';
        this.questionsHelpBlock = '';
        toastr.success(message);
    }

    onUpdateTestFail(message) {
        toastr.error(message);
    }
}

export default alt.createStore(TestStore);
