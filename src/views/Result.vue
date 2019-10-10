<template>
<div class="quiz-result">
  <h3>{{ $t('quiz_result') }}</h3>

  <p>
    {{ $t('questions_answered_correctly', {count: this.questions.length, correct: correctCount})}}
    <br>
    <strong>{{ $t('score') }}:</strong> {{ score }} %
  </p>

  <p class="small">
    {{ $t('click_on_the_question_to_learn_more') }}
  </p>

  <div class="quiz-answers">
    <div v-for="(question, index) in questions"
         :key="question.key"
         :class="question.isCorrect ? 'correct-answer' : 'wrong-answer'"
         class="quiz-answer"
         @click="$emit('viewQuestion', question.index)"
    >
      {{index + 1}}. {{question.title}}
    </div>
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
