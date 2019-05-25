<template>
  <div class="quiz-final">
    <h3>Quiz complete</h3>

    <h5 v-show="getMarkedQuestions().length">Questions flagged for review.</h5>
    <h5 v-show="!getMarkedQuestions().length">No Questions flagged for review.</h5>

    <div class="quiz-answers">
      <div v-for="(question) in getMarkedQuestions()"
           :key="question.key"
           class="quiz-answer btn btn-action btn-answer"
           @click="$emit('goToQuestion', question.index)"
        >
        {{question.index + 1}}. {{question.title}}
      </div>
    </div>

    <div class="quiz-nav">
      <button class="btn btn-primary" @click="$emit('previousQuestion')">
        Previous Question
      </button>
      <button class="btn btn-primary" @click="$emit('resolveQuiz')">
        Finish Quiz
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Final',
  props: ['questions'],
  methods: {
    getMarkedQuestions() {
      const questions = [];
      this.questions.forEach((item, index) => {
        if (item.marked) {
          questions.push(item);
        }
      });

      return questions;
    },
  },
};
</script>

<style scoped>

</style>
