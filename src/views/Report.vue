<template>
<div class="quiz-suggest">
  <h3>Report a Question</h3>

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
export default {
  name: 'Report',
  methods: {
    submit() {
      console.log(JSON.stringify(this.report));
    },
  },
  data() {
    return {
      report: {
        email: '',
        comment: '',
        question: this.$route.params,
      },
    };
  },
};
</script>

<style scoped>

</style>
