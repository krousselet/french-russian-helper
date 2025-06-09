<template>
  <div class="p-4">
    <button @click="showKeyboard = !showKeyboard" class="bg-blue-500 text-white px-4 py-2 rounded mb-2">
      {{ showKeyboard ? 'Désactiver' : 'Activer' }} Clavier russe
    </button>

    <div v-if="showKeyboard">
      <button @click="toggleCaps" class="mb-2 px-3 py-1 border rounded">
        {{ isCaps ? 'Caps: ON' : 'Caps: OFF' }}
      </button>

      <div class="grid grid-cols-10 gap-2">
        <button
          v-for="char in currentLayout"
          :key="char"
          @click="emitChar(char)"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
        >
          {{ char }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// declare the event we’ll emit
// eslint-disable-next-line no-undef
const emit = defineEmits(['add-char'])

const showKeyboard = ref(false)
const isCaps = ref(false)

const russianLayout = [
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з',
  'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л',
  'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь',
  'б', 'ю', '.', ','
]

const currentLayout = computed(() =>
  isCaps.value ? russianLayout.map(c => c.toUpperCase()) : russianLayout
)

function toggleCaps() {
  isCaps.value = !isCaps.value
}

function emitChar(char) {
  emit('add-char', char)
}
</script>

<style scoped>
button { font-size: 1em; }
</style>