<template>
<div id="app">
  <textarea v-model="input"></textarea>
  <pre>{{output}}</pre>
  <vue-mathjax :formula="'$$' + output + '$$'"></vue-mathjax>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Compiler from './Compiler.js';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      input: 'foo * bar',
    };
  },
  computed: {
    output() {
      try {
        return Compiler(this.input);
      } catch (e) {
        console.warn(e);
        return 'ERROR';
      }
    }
  }
}
</script>

<style>
textarea {
  width: 100%;
  height: 50vh;
}
</style>
