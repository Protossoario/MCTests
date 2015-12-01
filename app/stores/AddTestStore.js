import alt from '../alt';
import AddTestActions from '../actions/AddTestActions';

class AddTestStore {
    constructor() {
        this.bindActions(AddTestActions);
        this.questions = [];
    }

    onGetAllQuestionsSuccess(data) {
        this.questions = data.map((q) => {
            q.selected = false;
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

    onUpdateIdentifier(event) {
        this.testIdentifier = event.target.value;

        this.testIdentifierState = '';
        this.testIdentifierHelpBlock = '';
    }

    onAddTestSuccess(message) {
        toastr.success(message, 'Success!', { timeOut: 5000 });
    }

    onAddTestFail(message) {
        toastr.error(message);
    }

    onInvalidTestIdentifier() {
        this.testIdentifierState = 'has-error';
        this.testIdentifierHelpBlock = 'Please make sure to enter a test identifier which conforms to the pattern of \'XXXXX-YYYY-MM-DD\'.';
    }

    onInvalidNumberOfQuestions() {
        this.questionsState = 'has-error';
        this.questionsHelpBlock = 'Every test must include at least one question.';
    }
}

export default alt.createStore(AddTestStore);
