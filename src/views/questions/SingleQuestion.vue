<template>
<div class="single-question quiz-answers">
  <div v-for="(answer, index) in question.answers" class="quiz-answer" :key="answer.text">
    <button
        class="btn btn-action btn-answer"
        @click="sendAnswer([index])"
        :class="getButtonClass(index)"
        :disabled="resolve"
    >
      <span class="question-num">{{indexToLetter(index)}}.</span>
      {{ answer.content }}
    </button>

    <blockquote class="quiz-explanation" v-if="resolve">
      <i class="icon icon-message"></i> {{ answer.explanation }}
    </blockquote>
  </div>

</div>
</template>

<script>
export default {
  name: 'SingleQuestion',
  props: ['question', 'resolve', 'sendAnswer'],
  methods: {
    getButtonClass(index) {
      const cl = [];

      if (this.resolve) {
        cl.push(this.question.resolution.includes(index) ? 'option-correct' : 'option-wrong');
      }

      if (this.question.answer && this.question.answer.includes(index)) {
        cl.push('checked-option');

        if (this.resolve) {
          cl.push(this.question.resolution.includes(index) ? 'checked-option-correct' : 'checked-option-wrong');
        }
      }

      return cl.join(' ');
    },
  },
};
</script>

<style scoped>
</style>
