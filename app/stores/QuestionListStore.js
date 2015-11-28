import alt from '../alt';
import QuestionListActions from '../actions/QuestionListActions';

class QuestionListStore {
    constructor() {
        this.bindActions(QuestionListActions);
        this.questions = [];
    }

    onGetAllQuestionsSuccess(data) {
        this.questions = data;
    }

    onGetAllQuestionsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
}

export default alt.createStore(QuestionListStore);
