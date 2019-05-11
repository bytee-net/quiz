<template>
<div class="bytee-quiz">
  <h3>{{quiz.title}}</h3>

  <div class="quiz-info" v-if="numQuestion !== -1 && numQuestion !== questions.length">
    Question {{numQuestion + 1}} of {{questions.length}}
    <br/>
    <div v-show="!resolveResolution">
      Time left: {{timerText}} Minutes
    </div>
  </div>

  <start
      v-show="numQuestion === -1"
      :quiz="quiz"
      @start="startQuiz">
  </start>

  <question
      v-if="numQuestion !== -1 && numQuestion !== questions.length"
      :question="activeQuestion"
      :resolve="resolveResolution"
      @answer="answer"
  >
  </question>

  <div class="quiz-nav" v-if="numQuestion !== -1 && numQuestion !== questions.length">
    <div class="columns">
      <div class="column col-6">
        <button
            class="btn btn-primary"
            v-if="!resolveResolution && numQuestion !== 0"
            @click="previousQuestion"
        >
          Previous Question
        </button>
        <button
            class="btn btn-primary"
            v-if="resolveResolution"
            @click="numQuestion = questions.length"
        >
          Back to the Results
        </button>
      </div>
      <div class="column col-6 text-right">
        <router-link to="/suggest" target="_blank">Suggest Question</router-link>
        |
        <router-link :to="{name: 'report', params: { question: activeQuestion.title } }"
                     target="_blank">
          Report Question
        </router-link>
      </div>
    </div>

  </div>

  <result
      v-if="numQuestion === questions.length"
      :questions="questions"
      @viewQuestion="viewQuestion"
  >
  </result>

</div>
</template>

<script>
import isEqual from 'lodash/isEqual';
import shuffle from 'lodash/shuffle';

import Start from './Start';
import Question from './Question';
import Result from './Result';

export default {
  name: 'home',
  components: {
    Result,
    Question,
    Start,
  },
  created() {
    // Very simple load
    this.$http
      .get(this.quiz.questionsApi)
      .then((response) => {
        this.prepareQuiz(response.data);
      })
      .catch((error) => {
        // TODO Add error handling
        console.log('Error loading questions');
        console.log(error);
      });
  },
  methods: {
    startQuiz() {
      this.startTimer(this.quiz.duration * 60);
      this.nextQuestion();
    },

    /**
     * Prepare the quiz question
     * @param questions
     */
    prepareQuiz(questions) {
      if (this.quiz.randomize) {
        // First shuffle the question ordering
        questions = shuffle(questions);
      }

      // Shrink questions
      if (this.quiz.questionCount && questions.length > this.quiz.questionCount) {
        questions = questions.slice(0, this.quiz.questionCount);
      }

      // Question answers
      if (this.quiz.randomize) {
        // Shuffle questions, stupid hack TODO Improve
        questions.forEach((question, index) => {
          if (question.kind === 'text') {
            return;
          }

          question.answers.forEach((answer, index) => {
            if (question.resolution.includes(index)) {
              answer.isCorrect = true;
            }
          });

          question.answers = shuffle(question.answers);
          question.resolution = [];

          question.answers.forEach((answer, index) => {
            if (answer.isCorrect) {
              question.resolution.push(index);
              delete answer.isCorrect;
            }
          });
        });
      }

      this.questions = questions;
    },

    startTimer(duration) {
      this.timer = setInterval(() => {
        let minutes = parseInt(duration / 60, 10);
        let seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        this.timerText = `${minutes}:${seconds}`;

        duration -= 1;

        if (duration < 0) {
          duration = 0;

          // Finish Quiz
          this.numQuestion = this.questions.length;
          this.resolveResolution = true;
          clearInterval(this.timer);
        }
      }, 1000);
    },

    answer(val) {
      // Checking done here for convenience
      this.activeQuestion.answer = val;
      this.activeQuestion.isCorrect = isEqual(val, this.activeQuestion.resolution);

      console.log(this.activeQuestion);

      this.nextQuestion();
    },

    // Navigation
    previousQuestion() {
      this.numQuestion -= 1;

      this.activeQuestion = this.questions[this.numQuestion];
    },

    nextQuestion() {
      this.numQuestion += 1;

      if (this.numQuestion === this.questions.length) {
        this.resolveResolution = true;
        clearInterval(this.timer);
        return;
      }

      this.activeQuestion = this.questions[this.numQuestion];
    },

    // Result
    viewQuestion(index) {
      this.numQuestion = index;
      this.activeQuestion = this.questions[this.numQuestion];
    },
  },
  data() {
    return {
      // For now
      quiz: window.Quiz,
      questions: [],

      // Simple Quiz State
      timer: null,
      timerText: '',

      numQuestion: -1,
      activeQuestion: {},

      // Results
      resolveResolution: false,
    };
  },
};
</script>

<style>
  .quiz-info {
    margin-bottom: 10px;
  }
</style>
