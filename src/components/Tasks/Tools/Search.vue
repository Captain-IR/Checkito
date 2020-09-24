<template>
  <q-input 
  outlined 
  v-model="searchField" 
  @keyup.esc="searchField = ''"
  v-select-all
  label="Search Todos" 
  class="col">
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        @click="searchField = ''"
        name="close"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/directive-select-all";


export default {
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get: function() {
        return this.search;
      },
      set: function(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSearch']),
  },
  directives: {
    selectAll
  }
};
</script>

<style></style>
