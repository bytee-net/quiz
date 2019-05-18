<template>
<div class="quiz-question text-left">
  <div class="question-title text-center">
    <h3>{{ question.title }}</h3>
    <p class="text-italic" v-show="question.kind === 'single'">
      Choose the most appropriate one.
    </p>
    <p class="text-italic" v-show="question.kind === 'multiple'">
      Choose all matching answers (zero to all).
    </p>
    <p class="text-italic" v-show="question.kind === 'text'">
      Type in the answer.
    </p>
  </div>

  <div class="code code-block" v-show="question.code_block">
    <code v-html="code_block_text">
    </code>
  </div>

  <single-question
      :question="question"
      :resolve="resolve"
      :sendAnswer="answer"
      v-if="question.kind === 'single'">
  </single-question>

  <multiple-question
      :question="question"
      :resolve="resolve"
      :sendAnswer="answer"
      v-if="question.kind === 'multiple'">
  </multiple-question>

  <text-question
      :question="question"
      :resolve="resolve"
      :sendAnswer="answer"
      v-if="question.kind === 'text'">
  </text-question>

</div>
</template>

<script>
import SingleQuestion from './questions/SingleQuestion';
import MultipleQuestion from './questions/MultipleQuestion';
import TextQuestion from './questions/TextQuestion';

export default {
  name: 'Question',
  components: {
    TextQuestion,
    MultipleQuestion,
    SingleQuestion,
  },
  props: ['question', 'resolve'],
  computed: {
    code_block_text() {
      // Hacky new line to br stuff, TODO improve parsing
      if (!this.question || !this.question.code_block) {
        return '';
      }

      // eslint-disable-next-line
      return this.question.code_block.replace(new RegExp('\r?\n', 'g'), '<br />');
    },
  },
  methods: {
    answer(val) {
      this.$emit('answer', val);
    },
  },
};
</script>

<style scoped>
  .code-block {
    margin-bottom: 15px;
  }

  .question-title {
    margin: 20px auto;
    width: 80%;
  }
</style>
