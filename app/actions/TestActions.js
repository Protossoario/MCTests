import alt from '../alt';

class TestActions {
    constructor() {
        this.generateActions(
            'getTestSuccess',
            'getTestFail',
            'getAllQuestionsSuccess',
            'getAllQuestionsFail',
            'updateTestSuccess',
            'updateTestFail',
            'invalidNumberOfQuestions'
        );
    }

    // After succesfully obtaining test data, dispatch method to query all questions, otherwise there's no point
    getTest(testIdentifier) {
        $.ajax({ url: '/api/tests/' + testIdentifier })
            .done((data) => {
                this.actions.getTestSuccess(data);
                this.actions.getAllQuestions();
            })
            .fail((jqXhr) => {
                this.actions.getTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
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

    updateTest(testIdentifier, questionIds) {
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: '/api/tests/' + testIdentifier,
            data: JSON.stringify({
                questionIds: questionIds
            })
        })
            .done((data) => {
                this.actions.updateTestSuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.updateTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
    }
}

export default alt.createActions(TestActions);
