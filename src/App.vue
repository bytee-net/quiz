<template>
<div id="app">
  <router-view/>
</div>
</template>

<style>
  @import './../node_modules/spectre.css/dist/spectre.min.css';

  /* Simple CSS for the Quiz */
  #app {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.05);
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.05);
    margin: 10px auto;
    padding: 15px 20px;
    line-height: 1.4rem;
    max-width: 960px;
  }

  /* spectre.css overwrites */
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

  .quiz-answers {
    margin: 35px 0;
  }

  /* Buttons (Answers) */
  .bytee-quiz .btn-answer {
    display: block;
    width: 100%;
    margin: 5px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
    height: 2rem;
  }

  .question-num {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 30px;
    background: #5755d9;
    border-radius: 0 15px 15px 0 / 0 20px 20px 0;
    margin-left: 0;
    padding: 0 5px;
    color: #fff;
  }

  .question-num:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
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

  .bytee-quiz .checked-option-correct .question-num, .bytee-quiz .option-correct .question-num {
    background: #36bf42;
  }

  .bytee-quiz .checked-option-wrong .question-num, .bytee-quiz .option-wrong .question-num {
    background: #ef251c;
  }

  .bytee-quiz .checked-option-wrong {
    border: 2px solid #ef251c;
    background: #d98484;
  }

  .bytee-quiz .checked-option-correct {
    border: 2px solid #36bf42;
    background: #6ed97b;
  }

  /* Suggest */
  .suggestion-answer {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
  }

  /* Some responsive improvements */
  /* Portrait and Landscape */
  @media only screen
  and (max-device-width: 812px) {
    #app {
      border: 0;
      padding: 5px;
      margin: 0 auto;
    }

    .btn-primary {
      display: block;
      margin: 5px 0;
    }

    .btn {
      width: 100%;
    }
  }
</style>
