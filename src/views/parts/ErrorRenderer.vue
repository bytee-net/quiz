<template>
  <div id="error-handler" class="toast" :class="'toast-' + severity" v-if="message">
    <div class="close-error" @click="$emit('close')">x</div>

    <div v-if="typeof message == 'string'">
      {{message}}
    </div>

    <div v-if="typeof message == 'object'">
      <h5>Api Error</h5>
      {{message.response.status}} - {{message.response.statusText}}
      <br />
      {{message.response.data}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorRenderer',
  props: ['message', 'severity'],
};
</script>

<style scoped>
  .toast {
    position: relative;
  }

  .close-error {
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>
