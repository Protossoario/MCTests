import alt from '../alt';
import StudentTestActions from '../actions/StudentTestActions';

class StudentTestStore {
    constructor() {
        this.bindActions(StudentTestActions)
        this.questions = [];
        this.submitted = false;
        this.submitHelpBlock = '';
        this.submitHelpBlockState = '';
        this.finalScore = 0;
    }

    onGetTestSuccess() {
        this.submitted = false;
        this.submitHelpBlock = '';
        this.submitHelpBlockState = '';
        this.finalScore = 0;
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
        // cannot change answers once they have been submitted
        if (this.submitted) {
            return;
        }

        this.submitHelpBlock = '';
        this.submitHelpBlockState = '';

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

    onSubmitTest() {
        let allQuestionsHaveAnswers = this.questions.reduce((answered, q) => {
            return answered && q.answers.reduce((answered, a) => answered || a.selected, false);
        }, true);
        if (allQuestionsHaveAnswers) {
            this.submitted = true;

            let result = 0;
            // compute the score weight for each question
            this.questions.forEach((q) => {
                let weight = 0;
                let correctAnswers = q.answers.reduce((count, a) => count + (a.correct ? 1 : 0), 0);
                if (correctAnswers > 1) {
                    // question has multiple right answers, so weight score = ratio of correct answers
                    q.answers.forEach((a) => weight += (a.selected == a.correct ? 1 : 0));
                    result += weight / q.answers.length;
                } else {
                    // question has one answer, so only if the answer is correct they get 1 point, else 0 points
                    q.answers.forEach((a) => weight += (a.selected && a.correct ? 1 : 0));
                    result += weight;
                }
            });
            // average the question weights to get the final score
            result /= this.questions.length;
            this.finalScore = result;
            toastr.info("Your final score is " + (result * 100).toFixed(1) + "%");
        } else {
            this.submitHelpBlockState = 'has-error';
            this.submitHelpBlock = 'You must select an answer for every question before submitting.';
        }
    }
}

export default alt.createStore(StudentTestStore);
