<template>
<div id="app">
  <textarea class="input-container" v-model="input"></textarea>
  <div class="raw-output-container">
    <pre>{{output}}</pre>
    <button v-clipboard:copy="output">LaTex kopieren</button>
  </div>
  <Renderer class="preview-container" :latex="output" />
</div>
</template>

<script>
import Compiler from './Compiler.js';
import Renderer from './components/Renderer.vue';

export default {
  name: 'App',
  components: {
    Renderer,
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
#app {
  display: flex;
}

.input-container {
  width: 100%;
  height: 95vh;
}

.raw-output-container {
  width: 100%;
  height: 95vh;
  border: 1px solid gray;
}

.preview-container {
  width: 100%;
  height: 95vh;
  border: 1px solid gray;
}
</style>
