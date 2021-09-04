<template>
    <header class="bg-savvy-red-500 text-white">
        <a href="/"><h1 class="p-2 text-3xl text-center hover:underline">HTML Tags Memory Test</h1></a>

        <p class="p-2 text-lg text-center">There are {{ validElements.length }} valid HTML tags <sup
                class="text-xs"><a
                class="text-white underline hover:text-savvy-blue-500 hover:no-underline" href="#source">*</a></sup><br>How
            many can you
            remember?</p>
    </header>

    <main class="w-full lg:w-lg mx-auto">
        <form class="p-2 my-4 text-center" @submit.prevent>
            <label>
                Enter a tag:

                <input class="border-2 border-savvy-blue-900 border-r-0 outline-none p-2"
                       type="text"
                       v-model="tag"
                       @keyup.enter="guess"
                       autofocus
                       autocapitalize="off"
                       autocomplete="off"
                >
            </label>

            <button class="bg-savvy-blue-900 border-2 border-savvy-blue-900 p-2 text-white hover:bg-savvy-blue-500 hover:text-gray-900"
                    @click="guess"
            >Guess
            </button>
        </form>

        <p class="p-2 mb-8 text-center text-md md:text-xl">
            You've remembered {{ correct.length }} / {{ validElements.length }} elements

            <button v-if="correct.length < validElements.length"
                    class="bg-savvy-blue-900 border-2 border-savvy-blue-900 p-2 m-2 text-white hover:bg-savvy-blue-500 hover:text-gray-900"
                    @click="showMissing"
            >Show me what I'm missing
            </button>
        </p>

        <p v-if="correct.length === validElements.length" class="p-2 text-center">
            Congratulations!! You got every valid element!
        </p>

        <div class="grid grid-cols-1/3 gap-4">
            <ul v-if="correct.length">
                <li v-for="(answer, index) in correct"
                    :key="index"
                    class="px-2 bg-savvy-blue-400 odd:bg-savvy-blue-300"
                >&lt;{{ answer }}&gt;
                </li>
            </ul>

            <dl v-if="lastAnswer"
            >
                <dt class="p-2 text-white"
                    :class="{ 'bg-red-600': lastAnswer.status === 'deprecated', 'bg-green-700': lastAnswer.status === 'valid' }">
                    {{ lastAnswer.name }} <span v-if="lastAnswer.status === 'deprecated'">(deprecated/obsolete)</span>
                </dt>

                <dd class="border p-2"
                    :class="{ 'bg-red-300': lastAnswer.status === 'deprecated', 'bg-green-200': lastAnswer.status === 'valid', 'border-red-600': lastAnswer.status === 'deprecated', 'border-green-700': lastAnswer.status === 'valid' }">
                    {{ lastAnswer.description }}
                </dd>
            </dl>

            <dl v-if="missing" id="#missing">
                <template v-for="(element, index) in missing" :key="index">
                    <dt class="bg-red-600 p-2 text-white">
                        {{ element.name }}
                    </dt>

                    <dd class="border border-red-600 bg-red-300 p-2 mb-2">
                        {{ element.description }}
                    </dd>
                </template>
            </dl>
        </div>
    </main>

    <footer class="p-2 md:text-right text-sm">
        <p id="source">
            List of tags and descriptions from: <cite class="whitespace-nowrap"><a
                class="text-purple-700 underline hover:text-blue-700"
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">MDN Web Docs - HTML
            elements reference</a></cite>
        </p>

        <p class="mt-2">
            <span class="whitespace-nowrap">&copy;
            <a href="https://savvywombat.com.au" class="hover:underline"><span class="font-bold text-savvy-gray-500">Savvy </span>
                <span class="font-bold text-savvy-brown-500">Wombat</span></a></span>
        </p>
    </footer>
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
      this.missing = null;

      if (this.validElements.find((element) => {
        return element?.name === '<' + this.tag + '>';
      })) {
        if (!this.correct.includes(this.tag)) {
          this.correct.unshift(this.tag);
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
      this.lastAnswer = null;

      this.missing = this.validElements.filter((element) => {
        return !this.correct.includes(element.name.substring(1, element.name.length - 1))
      })

      if (this.missing.length > 0) {
        window.location = '#missing'
      }
    }
  }
}
</script>


