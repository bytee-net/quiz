<template>
<div class="quiz-start">
  <h1>{{quiz.title}}</h1>

  <div class="quiz-description col-7">
    {{quiz.description}}
  </div>

  <div class="quiz-nav">
    <button class="btn btn-primary btn-quiz-start" @click="$emit('start')">Start Quiz</button>
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
  .btn-quiz-start {
    padding: 6px 25px;
  }

  .quiz-start h1 {
  }

  .quiz-start h1:after {
    display: block;
    content: "";
    position: relative;
    left: 0;
    bottom: 0;
    max-width: 40px;
    height: 1px;
    border-bottom: 3px solid #5755d9;
    margin: 0;
    padding: 8px 0;
  }

  .quiz-nav {
    margin-top: 20px;
  }

  .quiz-description {
  }
</style>
