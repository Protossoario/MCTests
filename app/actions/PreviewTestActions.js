import alt from '../alt';

class PreviewTestActions {
    constructor() {
        this.generateActions(
            'getTestSuccess',
            'getTestFail',
            'getQuestionsSuccess',
            'getQuestionsFail'
        );
    }

    getTest(testIdentifier) {
        $.ajax({ url: '/api/tests/' + testIdentifier })
            .done((data) => {
                this.actions.getTestSuccess(data);
                this.actions.getQuestions(data.questionIds);
            })
            .fail((jqXhr) => {
                this.actions.getTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
    }

    getQuestions(questionIds) {
        // query MCQuestions for question data
        $.ajax({
            url: 'http://localhost:8080/MCQuestions/api/questions/find',
            type: 'POST',
            data: {
                ids: questionIds
            },
            traditional: true // this tells jQuery not to encode arrays in the PHP way, which is incompatible with Jersey/Tomcat
        })
            .done((data) => {
                this.actions.getQuestionsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getQuestionsFail(jqXhr);
            });
    }
}

export default alt.createActions(PreviewTestActions);
