<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    class="col-3 q-ml-sm"
    label="Sort by"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      options: [
        {
          label: "Title",
          value: "title"
        },
        {
          label: "Date",
          value: "dueDate"
        }
      ]
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get: function() {
        return this.sort;
      },
      set: function(value) {
        this.setSort(value)
      }
    }
  }, 
  methods: {
    ...mapActions('tasks', ['setSort'])
  }
};
</script>

<style></style>
