<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <Search />
    </div>

    <p
      v-if="
        search &&
          !Object.keys(tasksTodo).length &&
          !Object.keys(tasksCompleted).length
      "
    >
      No search results.
    </p>

    <NoTasks v-if="!Object.keys(tasksTodo).length && !search" />

    <TasksTodo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />

    <TasksCompleted
      v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted"
    />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"])
  },
  methods: {},
  mounted: function() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    AddTask: require("components/Tasks/Modals/AddTask.vue").default,
    TasksTodo: require("components/Tasks/TasksTodo.vue").default,
    TasksCompleted: require("components/Tasks/TasksCompleted.vue").default,
    NoTasks: require("components/Tasks/NoTasks.vue").default,
    Search: require("components/Tasks/Tools/Search.vue").default
  }
};
</script>

<style lang="scss"></style>
