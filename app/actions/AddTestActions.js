import alt from '../alt';

class AddTestActions {
    constructor() {
        this.generateActions(
            'getAllQuestionsSuccess',
            'getAllQuestionsFail'
        );
    }

    getAllQuestions() {
        $.ajax({ url: 'http://localhost:8080/MCQuestions/api/questions' })
            .done((data) => {
                this.actions.getAllQuestionsSuccess(data)
            })
            .fail((jqXhr) => {
                this.actions.getAllQuestionsFail(jqXhr)
            });
    }

    toggleQuestionSelected(id) {
        this.dispatch(id);
    }
}

export default alt.createActions(AddTestActions);
