import alt from '../alt';
import TestListActions from '../actions/TestListActions';

class TestListStore {
    constructor() {
        this.bindActions(TestListActions);
        this.tests = [];
    }

    onGetAllTestsSuccess(data) {
        this.tests = data;
    }

    onGetAllTestsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
}

export default alt.createStore(TestListStore);
