import alt from '../alt';

class TestListActions {
    constructor() {
        this.generateActions(
            'getAllTestsSuccess',
            'getAllTestFail'
        );
    }

    getAllTests() {
        $.ajax({ url: '/api/tests' })
            .done((data) => {
                this.actions.getAllTestsSuccess(data)
            })
            .fail((jqXhr) => {
                this.actions.getAllTestFail(jqXhr)
            });
    }
}

export default alt.createActions(TestListActions);
