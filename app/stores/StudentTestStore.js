import alt from '../alt';
import StudentTestActions from '../actions/StudentTestActions';

class StudentTestStore {
    constructor() {
        this.bindActions(StudentTestActions)
        this.questions = [];
    }

    onGetTestFail(message) {
        toastr.error(message);
    }

    onGetQuestionsSuccess(data) {
        // Set all answers as not selected
        this.questions = data.map((q) => {
            q.answers = q.answers.map((a) => {
                a.selected = false;
                return a;
            });
            return q;
        });
    }

    onGetQuestionsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }

    onUpdateQuestionAnswer(indexes) {
        let questionIndex = indexes.questionIndex;
        let answerIndex = indexes.answerIndex;
        let question = this.questions[questionIndex];
        let correctAnswers = question.answers.reduce((count, a) => {
            return count + (a.correct ? 1 : 0);
        }, 0);
        if (correctAnswers > 1) {
            // Toggle answer selection for clicked answer index
            this.questions[questionIndex].answers[answerIndex].selected = !this.questions[questionIndex].answers[answerIndex].selected;
        } else {
            // Set selected answer index as the only selected one for this question
            this.questions[questionIndex].answers = question.answers.map((a, index) => {
                a.selected = (index == answerIndex);
                return a;
            });
        }
    }
}

export default alt.createStore(StudentTestStore);
