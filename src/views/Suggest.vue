<template>
<div class="quiz-suggest">
  <h3>{{ $t('suggest_question') }}</h3>

  <error-renderer :message="errorMessage" :severity="errorSeverity"
                  @close="errorMessage = ''"></error-renderer>

  <div class="toast toast-success thank-you-message" v-show="showThankYou">
    {{ $t('thank_you_for_your_suggestion') }}
  </div>

  <div class="form-group">
    <label for="email" class="form-label">{{ $t('your_email') }} ({{ $t('optional') }})</label>
    <input type="text" id="email" v-model="suggestion.email" class="form-input"
           placeholder="contact@bytee.net">
  </div>

  <div class="form-group">
    <label for="title" class="form-label">{{ $t('question') }}</label>
    <input id="title" type="text" placeholder="Text of the Question" class="form-input"
           v-model="suggestion.title">
  </div>

  <div class="form-group">
    <label for="code_block" class="form-label">{{ $t('optional_code_block') }}</label>
    <textarea id="code_block" v-model="suggestion.code_block" class="form-input"
              placeholder="For example for some lines of a file"></textarea>
  </div>

  <div class="form-group">
    <label for="category" class="form-label">{{ $t('category') }}</label>
    <input id="category" type="text"
           placeholder="To which exam / topic does the Question belong? E.g. LPIC 101"
           class="form-input" v-model="suggestion.category">
  </div>

  <div class="form-group">
    <label for="tags" class="form-label">{{ $t('tags') }}</label>
    <input id="tags" type="text"
           placeholder="Separate them with commas. E.g. Filesystem, Hardware etc."
           class="form-input"
           v-model="suggestion.tags">
  </div>

  <div class="form-group">
    <label for="difficulty" class="form-label">{{ $t('difficulty') }}</label>
    <select id="difficulty" class="form-input" v-model="suggestion.difficulty">
      <option value="0">0 ({{ $t('very_easy') }})</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10 ({{ $t('very_hard') }})</option>
    </select>
  </div>

  <div class="form-group">
    <label for="kind" class="form-label">{{ $t('question_type') }}</label>
    <select id="kind" class="form-input" v-model="suggestion.kind">
      <option value="">{{ $t('please_select') }}</option>
      <option value="multiple" selected="selected">{{ $t('multiple_choice_question') }}</option>
      <option value="single">{{ $t('single_choice_question') }}</option>
      <option value="text">{{ $t('fill_in_the_blank_question') }}</option>
    </select>
  </div>

  <!-- TODO MOVE to own components -->
  <div class="text-question" v-show="suggestion.kind === 'text'">
    <div class="form-group">
      <label for="resolution" class="form-label">{{ $t('correct_answer') }}</label>
      <input type="text" id="resolution" class="form-input" v-model="suggestion.resolution"
             :placeholder="$t('answer_to_the_question')">
    </div>

    <div class="form-group">
      <label for="explanation" class="form-label">{{ $t('explanation') }}</label>
      <input type="text" id="explanation" class="form-input" v-model="suggestion.explanation"
             :placeholder="$t('explain_the_correct_answer')">
    </div>
  </div>

  <div class="single-question-answer"
       v-show="suggestion.kind === 'single' || suggestion.kind === 'multiple'">
    <h5>{{ $t('possible_answers') }}</h5>
    <div class="columns suggestion-answer" v-for="(answer, index) in suggestion.answers"
         :key="answer.text">
      <div class="col col-11">
        <div class="form-group">
          <label class="form-label">{{ $t('option_to_choose_from') }}</label>
          <input type="text" class="form-input" v-model="answer.content"
                 :placeholder="$t('answer_to_the_question')">
        </div>
        <div class="form-group">
          <label class="form-label">{{ $t('explanation_why') }}</label>
          <input type="text" class="form-input" v-model="answer.explanation"
                 :placeholder="$t('hint_to_the_answer')">
        </div>
        <div class="form-group">
          <input type="checkbox" v-model="answer.isCorrect" :id="'answer-' + index">
          <label :for="'answer-' + index"> {{ $t('correct_answer') }}</label>
        </div>
      </div>
      <div class="col col-1 text-right">
        <button class="btn" @click="suggestion.answers.push({content: '', explanation: '',})">+
        </button>
        <button class="btn" @click="suggestion.answers.splice(index, 1)" v-if="index !== 0">-
        </button>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="comment" class="form-label">{{ $t('comment') }}</label>
    <textarea id="comment" type="text" placeholder="Some notes"
              class="form-input" v-model="suggestion.comment">
    </textarea>
  </div>

  <div class="quiz-nav">
    <button class="btn btn-primary" @click="submit">{{ $t('submit_question') }}</button>
    <router-link to="/" class="btn">{{ $t('back_to_quiz') }}</router-link>
  </div>
</div>
</template>

<script>
import ErrorRenderer from './parts/ErrorRenderer';

export default {
  name: 'Suggest',
  components: {
    ErrorRenderer,
  },
  methods: {
    submit() {
      const submission = JSON.parse(JSON.stringify(this.suggestion));

      // Clean up
      submission.title = submission.title.trim();

      submission.tags = submission.tags ? submission.tags.split(',') : '';

      // Multiple answers
      if (submission.kind !== 'text') {
        submission.resolution = [];

        submission.answers.forEach((item, index) => {
          item.content = item.content ? item.content.trim() : '';
          item.explanation = item.explanation ? item.explanation.trim() : '';

          // Transform the correct answers to an array
          if (item.isCorrect) {
            submission.resolution.push(index);
          }

          delete item.isCorrect;
        });
      } else {
        submission.resolution = [submission.resolution];
      }

      console.log(JSON.stringify(submission));

      // For now
      this.$http
        .post(`${window.Quiz.apiEndpoint}/suggest`, submission)
        .then((response) => {
          this.showThankYou = true;
          this.resetForm(this.suggestion);
        })
        .catch((error) => {
          this.errorMessage = error;
          this.errorSeverity = 'error';
        });
    },

    resetForm(previousItem = null) {
      // Reset the form
      this.suggestion = {
        title: '',
        // Keep these for convenience
        email: previousItem.email,
        tags: previousItem.tags,
        category: previousItem.category,
        code_block: '',
        explanation: '',
        kind: 'single',
        difficulty: 0,
        answers: [{
          content: '',
          explanation: '',
        }],
        comment: '',
      };
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
        answers: [{
          content: '',
          explanation: '',
        }],
      },
      showThankYou: false,

      // Error Handling
      errorMessage: '',
      errorSeverity: 'warning',
    };
  },
};
</script>
