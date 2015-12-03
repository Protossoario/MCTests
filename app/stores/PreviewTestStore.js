import alt from '../alt';
import PreviewTestActions from '../actions/PreviewTestActions';

class PreviewTestStore {
    constructor() {
        this.bindActions(PreviewTestActions)
        this.questions = [];
    }

    onGetTestFail(message) {
        toastr.error(message);
    }

    onGetQuestionsSuccess(data) {
        this.questions = data;
    }

    onGetQuestionsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
}

export default alt.createStore(PreviewTestStore);
