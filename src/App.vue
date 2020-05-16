<template>
<div id="app">
  <textarea class="input-container" v-model="input"></textarea>
  <div class="raw-output-container">
    <button @click="fullDocument = !fullDocument">{{'ganzes Dokument zeigen: ' + (fullDocument ? 'Ja' : 'Nein')}}</button><br>
    <button v-clipboard:copy="selectedOutput">LaTex kopieren</button>
    <pre class="raw-output">{{selectedOutput}}</pre>
  </div>
  <Renderer class="preview-container" :latex="output" />
</div>
</template>

<script>
import Compiler from './Compiler.js';
import ConvertToDocument from './ConvertToDocument.js';
import Renderer from './components/Renderer.vue';
// import Renderer from './components/StrictRenderer.vue';

export default {
  name: 'App',
  components: {
    Renderer,
  },
  data() {
    return {
      input: 'foo * bar',
      fullDocument: false,
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
    },
    document() {
      try {
        return ConvertToDocument(this.input);
      } catch (e) {
        console.warn(e);
        return 'ERROR';
      }
    },
    selectedOutput() {
      return this.fullDocument ? this.document : this.output;
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

.raw-output {
  background-color: #ddd;
}
</style>
