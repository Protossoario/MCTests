import alt from '../alt';

class QuestionListActions {
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
}

export default alt.createActions(QuestionListActions);
