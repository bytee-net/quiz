<template>
  <div class="quiz-start">
    {{quiz.description}}

    <div class="quiz-nav">
      <button class="btn btn-primary" @click="$emit('start')">Start Quiz</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Start',
  props: ['quiz'],
};
</script>

<style scoped>

</style>
