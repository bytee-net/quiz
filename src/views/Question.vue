<template>
  <div class="quiz-question text-left">

    <div class="question-title">
      <h5>{{ question.title }}</h5>
    </div>

    <div class="code" v-show="question.code_block">
      <code v-html="code_block_text">
      </code>
    </div>

    <single-question
        :question="question"
        :resolve="resolve"
        :sendAnswer="answer"
        v-if="question.kind === 'single'" >
    </single-question>

    <multiple-question
        :question="question"
        :resolve="resolve"
        :sendAnswer="answer"
        v-if="question.kind === 'multiple'" >
    </multiple-question>

    <text-question
        :question="question"
        :resolve="resolve"
        :sendAnswer="answer"
        v-if="question.kind === 'text'" >
    </text-question>
  </div>
</template>

<script>
// TODO Improve nesting
import SingleQuestion from './questions/SingleQuestion';
import MultipleQuestion from './questions/MultipleQuestion';
import TextQuestion from './questions/TextQuestion';

export default {
  name: 'Question',
  components: { TextQuestion, MultipleQuestion, SingleQuestion },
  props: ['question', 'resolve'],
  computed: {
    code_block_text() {
      // Hacky new line to br stuff
      if (!this.question || !this.question.code_block) {
        return '';
      }

      // eslint-disable-next-line
      return this.question.code_block.replace(new RegExp('\r?\n','g'), '<br />');
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

</style>
