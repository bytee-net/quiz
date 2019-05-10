<template>
<div class="quiz-suggest">
  <h3>Suggest a Question</h3>

  <div class="form-group">
    <label for="title" class="form-label">Question</label>
    <input id="title" type="text" placeholder="Text of the Question" class="form-input"
           v-model="suggestion.title">
  </div>

  <div class="form-group">
    <label for="code_block" class="form-label">Optional code / output block</label>
    <textarea id="code_block" v-model="suggestion.code_block" class="form-input"
              placeholder="For example for some lines of a file"></textarea>
  </div>

  <div class="form-group">
    <label for="category" class="form-label">Category</label>
    <input id="category" type="text"
           placeholder="To which exam / topic does the Question belong? E.g. LPIC 101"
           class="form-input" v-model="suggestion.category">
  </div>

  <div class="form-group">
    <label for="tags" class="form-label">Tags</label>
    <input id="tags" type="text"
           placeholder="Separate them with commas. E.g. Filesystem, Hardware etc."
           class="form-input"
           v-model="suggestion.tags">
  </div>

  <div class="form-group">
    <label for="difficulty" class="form-label">Difficulty</label>
    <select id="difficulty" class="form-input" v-model="suggestion.difficulty">
      <option value="0">0 (Very Easy)</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10 (Very Hard)</option>
    </select>
  </div>

  <div class="form-group">
    <label for="kind" class="form-label">Question-Type</label>
    <select id="kind" class="form-input" v-model="suggestion.kind">
      <option value="">Please select</option>
      <option value="multiple" selected="selected">Multiple-Choice Question</option>
      <option value="single">Single-Choice Question</option>
      <option value="text">Fill-in-the-blank Question</option>
    </select>
  </div>

  <!-- TODO MOVE to own components -->
  <div class="text-question" v-show="suggestion.kind === 'text'">
    <div class="form-group">
      <label for="resolution" class="form-label">Correct Answer</label>
      <input type="text" id="resolution" class="form-input" v-model="suggestion.resolution"
             placeholder="Answer to the Question">
    </div>

    <div class="form-group">
      <label for="explanation" class="form-label">Hint / Explanation</label>
      <input type="text" id="explanation" class="form-input" v-model="suggestion.explanation"
             placeholder="Explain the correct answer.">
    </div>
  </div>

  <div class="single-question-answer"
       v-show="suggestion.kind === 'single' || suggestion.kind === 'multiple'">
    <h5>Possible answers</h5>
    <div class="columns suggestion-answer" v-for="(answer, index) in suggestion.answers"
         :key="answer.text">
      <div class="col col-11">
        <div class="form-group">
          <label class="form-label">Option to choose from</label>
          <input type="text" class="form-input" v-model="answer.content"
                 placeholder="Answer for the Question">
        </div>
        <div class="form-group">
          <label class="form-label">Explanation why the answer is wrong / correct.</label>
          <input type="text" class="form-input" v-model="answer.explanation"
                 placeholder="Hint / Explanation for the answer.">
        </div>
        <div class="form-group">
          <input type="checkbox" v-model="answer.isCorrect" :id="'answer-' + index">
          <label :for="'answer-' + index"> Correct Answer</label>
        </div>
      </div>
      <div class="col col-1 text-right">
        <button class="btn" @click="suggestion.answers.push({})">+</button>
        <button class="btn" @click="suggestion.answers.splice(index, 1)" v-if="index !== 0">-
        </button>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="comment" class="form-label">Comment</label>
    <textarea id="comment" type="text" placeholder="Some notes"
              class="form-input" v-model="suggestion.comment">
    </textarea>
  </div>

  <div class="quiz-nav">
    <button class="btn btn-primary" @click="submit">Submit Question</button>
    <router-link to="/" class="btn">Back to Quiz</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'Suggest',
  methods: {
    submit() {
      // Clean up
      this.suggestion.title = this.suggestion.title.trim();

      // Multiple answers
      if (this.suggestion.kind !== 'text') {
        this.suggestion.resolution = [];

        this.suggestion.answers.forEach((item, index) => {
          item.content = item.content.trim();
          item.explanation = item.explanation.trim();

          // Transform the correct answers to an array
          if (item.isCorrect) {
            this.suggestion.resolution.push(index);
          }

          delete item.isCorrect;
        });
      } else {
        this.suggestion.resolution = [this.suggestion.resolution];
      }

      console.log(JSON.stringify(this.suggestion));
    },
  },
  data() {
    return {
      suggestion: {
        title: '',
        explanation: '',
        code_block: '',
        kind: 'single',
        difficulty: 0,
        answers: [{}],
      },
    };
  },
};
</script>

<style scoped>
  .suggestion-answer {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
