<template>
<div class="renderer-container">
  <!-- <vue-mathjax :formula="content" :options="{loader: {load: ['[tex]/physics']},tex: {packages: {'[+]': ['physics']}}}" /> -->
  <!-- <p>{{content}}</p> -->
  <MathJax3 :formula="content" />
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
    content() {
      return "$$" + this.latex + "$$";
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
