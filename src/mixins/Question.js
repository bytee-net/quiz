/**
 * Simple helper for Questions
 */
export default {
  name: 'Question',
  methods: {
    indexToLetter(num) {
      return this.abc[num];
    },
  },
  data() {
    return {
      abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    };
  },
};
