<template>
    <h1>HTML Tags Memory Test</h1>

    <h2>There are {{ validElements.length }} valid HTML tags - can you remember them all?</h2>

    <form @submit.prevent>
        <label>
            Enter a tag:

            <input type="text" v-model="tag" @keyup.enter="guess" autofocus>
        </label>

        <button @onclick="guess">Guess</button>
    </form>

    <p>
        You've remembered {{ correct.length }} / {{ validElements.length }} elements
    </p>

    <ul>
        <li v-for="(answer, index) in correct" :key="index">{{ answer }}</li>
    </ul>
</template>

<script>
import {reference} from "./mdn-reference";

export default {
  name: 'App',

  data() {
    return {
      tag: '',
      correct: [],
    }
  },

  computed: {
    validElements() {
      return reference.flatMap((section) => {
        if (!section.title.includes('deprecated')) {
          return section.elements;
        }
      })
    }
  },

  methods: {
    guess() {
        if (this.validElements.find((element) => {
            return element?.name === '<' + this.tag + '>';
        })) {
          if (!this.correct.includes(this.tag)) {
            this.correct.push(this.tag);
          }
          this.tag = '';
        }
    }
  }
}
</script>


