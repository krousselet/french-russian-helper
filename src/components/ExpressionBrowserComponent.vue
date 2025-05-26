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
  </nav>
  <div class="expression-browser">

    <div v-if="loading" class="loading">Chargement...</div>
    <div class="display" v-else-if="expressions.length">
      <input
        v-model="searchTerm"
        :placeholder=" $t('expressions')"
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Français</th>
            <th>Russian</th>
            <th>Russian Latin style</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exp in filteredExpressions" :key="exp.french">
            <td class="french">{{ exp.french }}</td>
            <td class="russian">{{ exp.russian }}</td>
            <td class="russian-hepburn">{{ exp.russianOccidental }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-data">{{ $t('dataError') }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Step 1: Themes (sorted alphabetically)
const themes = ["salutations", "nourriture", "sports", "arts", "transports", "corps"].sort();

const currentTheme = ref("");
const expressions = ref([]);
const searchTerm = ref("");
const loading = ref(false);

// Step 2: Theme Selection & Dynamic Import
const selectTheme = async (theme) => {
  currentTheme.value = theme;
  loading.value = true;
  try {
    const data = await import(`@/assets/themes/${theme}.json`);
    expressions.value = data.default.sort((a, b) =>
      a.french.localeCompare(b.french, 'fr')
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
    const russianHepburn = exp.russianHepburn || "";
    return (
      french.includes(term) ||
      russian.includes(term) ||
      russianHepburn.includes(term)
    );
  });
});
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
</style>
