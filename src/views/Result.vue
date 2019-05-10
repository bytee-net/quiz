<template>
<div class="quiz-result">
  <h3>Result</h3>

  <p>
    Out of {{ this.questions.length }} Questions you answered {{ correctCount }} correctly.<br>
    <strong>Score:</strong> {{ score }} %
  </p>

  <p class="small">
    Click on the Question to learn more about the answers.
  </p>

  <div v-for="(question, index) in questions"
       :key="question.key"
       :class="question.isCorrect ? 'correct-answer' : 'wrong-answer'"
       class="quiz-answer"
       @click="$emit('viewQuestion', index)"
    >
    {{index + 1}}. {{question.title}}
  </div>
</div>
</template>

<script>
export default {
  name: 'Result',
  props: ['questions'],
  created() {
    this.calculateResult();
  },
  methods: {
    calculateResult() {
      this.questions.forEach((item, index) => {
        if (item.isCorrect) {
          this.correctCount += 1;
        }
      });

      this.score = ((this.correctCount / this.questions.length) * 100).toFixed(2);
    },
  },
  data() {
    return {
      correctCount: 0,
      score: 100.0,
    };
  },
};
</script>

<style scoped>
  .quiz-answer {
    padding: 3px 5px;
    margin: 3px 0;
    cursor: pointer;
  }

  .correct-answer {
    border: 1px solid #36bf42;
  }

  .wrong-answer {
    border: 1px solid #ef251c;
  }
</style>
