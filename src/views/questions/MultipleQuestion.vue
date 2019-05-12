<template>
  <div class="multiple-question quiz-answers">
    <div
        v-for="(answer, index) in question.answers"
        class="quiz-answer"
        :key="answer.text"
        :class="answers.includes(index) ? 'checked-option': 'option'"
        :disabled="resolve"
      >
      <button
          class="btn btn-action btn-answer"
          :disabled="resolve"
          @click="toggleAnswer(index)"
          :class="getButtonClass(index)"
        >
        <input type="checkbox"
               :checked="answers.includes(index)"/>
        {{ answer.content }}
      </button>

      <blockquote class="quiz-explanation" v-if="resolve">
        <i class="icon icon-message"></i> {{ answer.explanation }}
      </blockquote>
    </div>

    <div class="nav-question text-right" v-show="!resolve">
      <button class="btn btn-primary" @click="answer">Answer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleQuestion',
  props: ['question', 'resolve', 'sendAnswer'],
  methods: {
    answer() {
      this.sendAnswer(this.answers.sort());
      this.answers = [];
    },

    toggleAnswer(index) {
      if (this.answers.includes(index)) {
        this.answers = this.answers.filter(item => item !== index);
      } else {
        this.answers.push(index);
      }
    },
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
  data() {
    return {
      answers: [],
    };
  },
};
</script>

<style scoped>
  .btn {
    text-align: left;
  }
</style>
