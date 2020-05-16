<template>
<div class="renderer-container">
  <div v-for="section of sections" :key="section.id">
    <!-- <vue-mathjax v-if="section.type == 'formula'" :formula="section.content" /> -->
    <MathJax3 v-if="section.type == 'formula'" :formula="section.content" />
    <p class="intertext" v-if="section.type == 'intertext'">{{section.content}}</p>
  </div>
</div>
</template>

<script>
import MathJax3 from './MathJax3.vue';

export default {
  props: ['latex'],
  components: {
    MathJax3,
  },
  computed: {
    sections() {
      let lines = this.latex.split('\n');
      let out = [];
      let currentSection = "";
      let id = 0;
      for (let line of lines) {
        if (line.startsWith('\\intertext')) {
          if (currentSection.length) out.push({
            type: 'formula',
            content: "$$" + currentSection + "$$",
            id: id++,
          });
          out.push({
            type: 'intertext',
            content: line.slice('\\intertext{'.length, -1),
            id: id++,
          });
          currentSection = "";
        } else {
          currentSection += line + '\n';
        }
      }
      if (currentSection.length) out.push({
        type: 'formula',
        content: "$$" + currentSection + "$$",
        id: id++,
      });
      return out;
    }
  }
}
</script>

<style>
.intertext {
  border-left: 5px solid gray;
  padding: 1em;
}
</style>
