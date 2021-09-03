<template>
    <h1>HTML Tags Memory Test</h1>

    <h2>There are {{ validElements.length }} valid HTML tags - can you remember them all?</h2>

    <form @submit.prevent>
        <label>
            Enter a tag:

            <input type="text" v-model="tag" @keyup.enter="guess" autofocus>
        </label>

        <button @click="guess">Guess</button>
    </form>

    <p>
        You've remembered {{ correct.length }} / {{ validElements.length }} elements
    </p>

    <button @click="showMissing">Show me what I'm missing</button>

    <ul>
        <li v-for="(answer, index) in correct" :key="index">&lt;{{ answer }}&gt;</li>
    </ul>

    <dl v-if="lastAnswer">
        <dt>
            {{ lastAnswer.name }} <span v-if="lastAnswer.status === 'deprecated'">(deprecated/obsolete)</span>
        </dt>

        <dd>
            {{ lastAnswer.description }}
        </dd>
    </dl>

    <dl v-if="missing">
        <template v-for="(element, index) in missing" :key="index">
            <dt>
                {{ element.name }}
            </dt>

            <dd>
                {{ element.description }}
            </dd>
        </template>
    </dl>
</template>

<script>
import {reference} from "./mdn-reference";

export default {
  name: 'App',

  data() {
    return {
      tag: '',
      correct: [],
      lastAnswer: null,
      missing: null,
    }
  },

  computed: {
    validElements() {
      return reference.flatMap((section) => {
        if (!section.title.includes('deprecated')) {
          return section.elements;
        }
      }).filter((element) => {
        return element !== undefined;
      })
    },

    deprecatedElements() {
      return reference.flatMap((section) => {
        if (section.title.includes('deprecated')) {
          return section.elements;
        }
      }).filter((element) => {
        return element !== undefined;
      })
    }
  },

  methods: {
    guess() {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.tag)) {
          this.tag = 'h1>, <h2>, <h3>, <h4>, <h5>, <h6'
        }

        if (this.validElements.find((element) => {
            return element?.name === '<' + this.tag + '>';
        })) {
          if (!this.correct.includes(this.tag)) {
            this.correct.push(this.tag);
          }

          this.lastAnswer = {
            'status': 'valid',
            ...this.validElements.find((element) => {
              return element?.name === '<' + this.tag + '>';
            })
          }

          this.tag = '';
        }

      if (this.deprecatedElements.find((element) => {
        return element?.name === '<' + this.tag + '>';
      })) {
        this.lastAnswer = {
          'status': 'deprecated',
          ...this.deprecatedElements.find((element) => {
            return element?.name === '<' + this.tag + '>';
          })
        }

        this.tag = '';
      }
    },

    showMissing() {
        this.missing = this.validElements.filter((element) => {
          return ! this.correct.includes(element.name.substring(1, element.name.length - 1))
        })
    }
  }
}
</script>


