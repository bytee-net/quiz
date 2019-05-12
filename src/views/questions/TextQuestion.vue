<template>
  <div class="text-question quiz-answers">
    <input
        type="text"
        class="form-input"
        placeholder="Your answer"
        v-model="answer"
        :class="getInputClass()"
        :disabled="resolve"
    >
    <blockquote class="quiz-explanation" v-if="resolve">
      <i class="icon icon-message"></i> {{ question.explanation }}
    </blockquote>

    <div class="text-question-answer text-right" v-show="!resolve">
      <button class="btn btn-primary" @click="send">Answer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextQuestion',
  props: ['question', 'resolve', 'sendAnswer'],
  methods: {
    getInputClass() {
      if (!this.resolve) {
        return '';
      }

      // Bit hacky, we don't need an array here
      return this.question.resolution.includes(this.answer) ? 'checked-option-correct' : 'checked-option-wrong';
    },

    send() {
      this.sendAnswer(this.answer.trim());
      this.answer = '';
    },
  },
  data() {
    return {
      answer: this.question.answer ? this.question.answer : '',
    };
  },
};
</script>

<style scoped>
  .btn-answer {
    display: block;
    width: 100%;
  }

  .btn {
    text-align: left;
  }

  .text-question-answer {
    margin: 10px 0;
  }
</style>
