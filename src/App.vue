<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style>
  @import './../node_modules/spectre.css/dist/spectre.min.css';

  #app {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  /* Overwrite spectre.css */
  .btn.disabled, .btn:disabled, .btn[disabled] {
    opacity: 0.8;
  }

  /* quiz-nav */
  .quiz-nav {
    margin: 10px 0;
  }

  .quiz-nav .btn {
    margin-right: 10px;
  }

  /* Buttons */

  .bytee-quiz .btn-answer {
    display: block;
    width: 100%;
    padding: 3px 5px;
    margin: 3px 0;
  }

  .bytee-quiz .option-correct {
    border: 1px solid #36bf42;
  }

  .bytee-quiz .option-wrong {
    border: 1px solid #ef251c;
  }

  .bytee-quiz .checked-option, .bytee-quiz .checked-option .btn-answer {
    background: #5755d9;
    color: #fff;
  }

  .bytee-quiz .checked-option-wrong {
    border: 2px solid #ef251c;
    background: #d98484;
  }

  .bytee-quiz .checked-option-correct {
    border: 2px solid #36bf42;
    background: #6ed97b;
  }
</style>
