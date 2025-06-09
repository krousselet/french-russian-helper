<template>
  <nav class="theme-nav">
    <button
      v-for="theme in themes"
      :key="theme"
      @click="selectTheme(theme)"
      :class="{ active: currentTheme === theme }"
    >
      {{ theme }}
    </button>
    <RussianKeyboardComponent @add-char="appendToSearch"></RussianKeyboardComponent>
    <input
      v-model="searchTerm"
      :placeholder="$t('expressions')"
      class="search-input"
    />
  </nav>
  <div class="expression-browser">
    <div v-if="loading" class="loading">Chargement...</div>
    <div class="display" v-else-if="expressions.length">
      <table>
        <thead>
          <tr>
            <th>Français</th>
            <th>Russian</th>
            <th>Russian Latin style</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exp in filteredExpressions"
            :key="exp.french"
            @click="openModal(exp)"
          >
            <td class="french">{{ exp.french }}</td>
            <td class="russian">{{ exp.russian }}</td>
            <td class="russian-hepburn">{{ exp.russianOccidental }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-data">{{ $t("dataError") }}</div>
  </div>
  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ selectedExpression.french }}</h2>
      <p><strong>Russe:</strong> {{ selectedExpression.russian }}</p>

      <div v-if="selectedExpression.declensions">
        <h3>Déclinaisons</h3>
        <table class="declensions-table">
          <thead>
            <tr>
              <th>Cas</th>
              <th>Singulier</th>
              <th>Pluriel</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cas, i) in selectedExpression.declensions.cases"
              :key="cas"
            >
              <td>{{ cas }}</td>
              <td>{{ selectedExpression.declensions.singular[i] }}</td>
              <td>{{ selectedExpression.declensions.plural[i] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- IF VERB -->
      <div v-if="selectedExpression.conjugaison">
        <h3>Conjugaison</h3>
        <table class="conjuguaison-table">
          <thead>
            <tr>
              <th>Présent</th>
              <th v-if="selectedExpression.conjugaison.past">Passé</th>
              <th v-if="selectedExpression.conjugaison.futur">Futur</th>
              <th v-if="selectedExpression.conjugaison.imperatif">Impératif</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(form, i) in selectedExpression.conjugaison.present"
              :key="i"
            >
              <td>{{ selectedExpression.conjugaison.present[i] }}</td>
              <td v-if="selectedExpression.conjugaison.past">
                {{ selectedExpression.conjugaison.past[i] }}
              </td>
              <td v-if="selectedExpression.conjugaison.futur">
                {{ selectedExpression.conjugaison.futur[i] }}
              </td>
              <td v-if="selectedExpression.conjugaison.imperatif">
                {{ selectedExpression.conjugaison.imperatif[i] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="close-button" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RussianKeyboardComponent from "./RussianKeyboardComponent.vue";

// Step 1: Themes (sorted alphabetically)
const themes = [
  "salutations",
  "nourriture",
  "sports",
  "arts",
  "transports",
  "corps",
  "nombres",
  "temps"
].sort();
const currentTheme = ref("");
const expressions = ref([]);
const searchTerm = ref("");
const loading = ref(false);
//MODAL
const selectedExpression = ref(null);
const showModal = ref(false);

// Step 2: Theme Selection & Dynamic Import
const selectTheme = async (theme) => {
  currentTheme.value = theme;
  loading.value = true;
  try {
    const data = await import(`@/assets/themes/${theme}.json`);
    expressions.value = data.default.sort((a, b) =>
      a.french.localeCompare(b.french, "fr")
    );
  } catch (error) {
    console.error(`Erreur de chargement pour ${theme}:`, error);
    expressions.value = [];
  } finally {
    loading.value = false;
  }
};

// Step 3: Filtering Logic
const filteredExpressions = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return expressions.value.filter((exp) => {
    const french = exp.french?.toLowerCase() || "";
    const russian = exp.russian || "";
    const russianHepburn = exp.russianOccidental || "";
    return (
      french.includes(term) ||
      russian.includes(term) ||
      russianHepburn.includes(term)
    );
  });
});

// Handle row click
const openModal = (exp) => {
  selectedExpression.value = exp;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

function appendToSearch(char) {
  searchTerm.value += char;
}
</script>

<style scoped lang="scss">
.french {
  color: green;
}

.russian {
  color: white;
}

.russian-hepburn {
  color: red;
}

.theme-nav {
  top: 160px;
  position: fixed;
  display: flex;
  gap: 10px;
  background-color: black;
  z-index: 15;
  border-radius: 14px;
}
.expression-browser {
  font-size: 1.5rem;
  position: relative;
  top: 190px;
  width: 100%;
  margin: 0 10px;
  .display {
    width: 98%;
  }
}

.theme-nav button {
  padding: 0.5rem 1rem;
  border: none;
  background: #ddd;
  cursor: pointer;
  border-radius: 5px;
}

.theme-nav button.active {
  background: #654089;
  color: white;
}

.search-input {
  width: 80%;
  max-width: 33vw;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.loading,
.no-data {
  text-align: center;
  padding: 2rem;
  color: gray;
}

//MODAL
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.declensions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
}

.close-button {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #654089;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
