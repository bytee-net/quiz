<template>
<div class="quiz-suggest">
  <h3>Report a Question</h3>
  <error-renderer :message="errorMessage" :severity="errorSeverity"
                  @close="errorMessage = ''"></error-renderer>

  <div class="toast toast-success thank-you-message" v-show="showThankYou">
    Thank you for the report!
  </div>

  <div class="form-group">
    <label for="email" class="form-label">Your Email</label>
    <input id="email" type="text"
           placeholder="test@example.com"
           class="form-input" v-model="report.email">
  </div>

  <div class="form-group">
    <label for="comment" class="form-label">Comment</label>
    <textarea id="comment" type="text" placeholder="Some notes"
              class="form-input" v-model="report.comment">
    </textarea>
  </div>

  <div class="quiz-nav">
    <button class="btn btn-primary" @click="submit">Submit Report</button>
    <router-link to="/" class="btn">Back to Quiz</router-link>
  </div>
</div>
</template>

<script>
import ErrorRenderer from './parts/ErrorRenderer';

export default {
  name: 'Report',
  components: {
    ErrorRenderer,
  },
  methods: {
    submit() {
      console.log(JSON.stringify(this.report));

      // For now
      this.$http
        .post(`${window.Quiz.apiEndpoint}/report`, this.report)
        .then((response) => {
          this.showThankYou = true;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.errorSeverity = 'error';
        });
    },
  },
  data() {
    return {
      report: {
        email: '',
        comment: '',
        question: this.$route.params.id,
      },

      showThankYou: false,

      // Error Handling
      errorMessage: '',
      errorSeverity: 'warning',
    };
  },
};
</script>
