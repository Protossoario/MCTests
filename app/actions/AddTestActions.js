import alt from '../alt';

class AddTestActions {
    constructor() {
        this.generateActions(
            'getAllQuestionsSuccess',
            'getAllQuestionsFail',
            'addTestSuccess',
            'addTestFail',
            'updateIdentifier',
            'invalidTestIdentifier',
            'invalidNumberOfQuestions'
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

    addTest(testIdentifier, questionIds) {
        $.ajax({
            type: 'POST',
            url: '/api/tests',
            data: {
                testIdentifier: testIdentifier,
                questionIds: questionIds
            }
        })
            .done((data) => {
                this.actions.addTestSuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.addTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
    }
}

export default alt.createActions(AddTestActions);
