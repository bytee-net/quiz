<template>
<div id="custom-quiz">
  <h3>{{ $t('custom-quiz.title') }}</h3>
  <p v-html="$t('custom-quiz.intro')"></p>

  <error-renderer :message="errorMessage" :severity="errorSeverity"
                  @close="errorMessage = ''"></error-renderer>

  <div class="columns">
    <div class="custom-categories column col-6 col-sm-auto">
      <h4>{{ $t('categories') }}</h4>
      <div v-for="(category) in categories" class="custom-category" :key="category._id">
        <input type="radio" :value="category._id" v-model="selectedCategory">
        {{category._id}} ({{category.count}})
      </div>
    </div>
    <div class="custom-tags column col-6 col-sm-auto">
      <h4>{{ $t('tags') }}</h4>
      <div v-for="(tag) in tags" class="custom-category" :key="tag._id">
        <input type="checkbox" :value="tag._id" v-model="selectedTags">
        {{tag._id}} ({{tag.count}})
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="question-count" class="form-label">{{ $t('custom-quiz.maximum_question_count')
      }}</label>
    <input id="question-count" type="number" placeholder="Number of questions, e.g. 20"
           class="form-input" v-model="questionCount">
  </div>

  <div class="form-group">
    <label for="duration" class="form-label">{{ $t('custom-quiz.maximum_duration') }}</label>
    <input id="duration" type="number" placeholder="Set the maximum duration"
           class="form-input" v-model="duration">
  </div>

  <div class="quiz-navigation">
    <button class="btn btn-primary" @click="startQuiz">{{ $t('start_quiz') }}</button>
  </div>
</div>
</template>

<script>
import ErrorRenderer from './parts/ErrorRenderer';

export default {
  name: 'CustomQuiz',
  components: {
    ErrorRenderer,
  },
  created() {
    // Load categories and tags
    this.loadCategories();
    this.loadTags();
  },
  methods: {
    startQuiz() {
      if (!this.selectedTags.length && !this.selectedCategory) {
        this.errorMessage = this.$t('custom-quiz.error_select_category_or_tag');
        this.errorSeverity = 'error';
        return;
      }

      let endpoint = '';

      if (this.selectedCategory) {
        endpoint = `/${this.selectedCategory}`;
      }

      if (this.selectedTags.length) {
        endpoint = `/tags/${this.selectedTags.join(',')}`;
      }

      // Manipulate endpoints for now..
      window.Quiz.title = this.$t('custom-quiz.title');
      window.Quiz.description = this.selectedCategory ? this.selectedCategory : this.selectedTags.join(' ');
      window.Quiz.duration = this.duration;
      window.Quiz.questionCount = this.questionCount;
      window.Quiz.customQuiz = true;
      window.Quiz.customizeQuiz = false;
      window.Quiz.questionsEndpoint = `${window.Quiz.apiEndpoint}/questions${endpoint}`;

      // Redirect to start
      this.$router.push('/');
    },

    // Load categories and tags
    loadCategories() {
      this.$http
        .get(`${this.quiz.apiEndpoint}/categories`)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.errorSeverity = 'error';
        });
    },
    loadTags() {
      this.$http
        .get(`${this.quiz.apiEndpoint}/tags`)
        .then((response) => {
          this.tags = response.data;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.errorSeverity = 'error';
        });
    },
  },
  data() {
    return {
      // For now
      quiz: window.Quiz,

      categories: [],
      tags: [],

      // Settings
      selectedCategory: '',
      selectedTags: [],
      duration: 30,
      questionCount: 20,

      // Error Handling
      errorMessage: '',
      errorSeverity: 'warning',
    };
  },
};
</script>

<style scoped>

</style>
