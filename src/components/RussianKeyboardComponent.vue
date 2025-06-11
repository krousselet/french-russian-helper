<template>
  <div class="keyboard-wrapper">
    <button @click="showKeyboard = !showKeyboard" class="toggle-btn">
      {{ showKeyboard ? 'Désactiver' : 'Activer' }} Clavier russe
    </button>

    <div v-if="showKeyboard">
      <button @click="toggleCaps" class="keyboard-container">
        {{ isCaps ? 'Caps: ON' : 'Caps: OFF' }}
      </button>

      <div class="keyboard">
        <button
          v-for="char in currentLayout"
          :key="char"
          @click="emitChar(char)"
          class="key-btn"
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
.keyboard-wrapper {
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.toggle-btn, .caps-btn {
  background-color: #111;
  color: white;
  border: 1px solid #444;
  padding: 10px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-btn:hover, .caps-btn:hover {
  background-color: #222;
}

.keyboard-container {
  gap: 12px;
  height: 32px;
  width: 70px;
  background-color: transparent;
  color: red;
}

.keyboard {
  gap: 10px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.key-btn {
  min-width: 40px;
  padding: 10px;
  font-size: 1.1rem;
  background-color: #222;
  border: 1px solid #555;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  color: green;
}

.key-btn:hover {
  background-color: #333;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .key-btn {
    min-width: 32px;
    padding: 8px;
    font-size: 1rem;
  }

  .toggle-btn, .caps-btn {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}
</style>