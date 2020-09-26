<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <Search />
          <Sort />
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

        <q-scroll-area class="q-scroll-area-tasks">
          <NoTasks
            v-if="
              !Object.keys(tasksTodo).length &&
                !search &&
                !settings.showTasksInOneList
            "
          />

          <TasksTodo v-if="tasksTodo.length" :tasksTodo="tasksTodo" />

          <TasksCompleted
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted"
            class="q-mb-xl"
          />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            class="all-pointer-events"
            color="primary"
            size="24px"
            icon="add"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">

        <q-spinner-gears
          color="primary"
          size="4em"
        />
        </span>
      </template>
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
    ...mapGetters("settings", ["settings"]),
    ...mapState("tasks", ["search", "tasksDownloaded"])
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
    Search: require("components/Tasks/Tools/Search.vue").default,
    Sort: require("components/Tasks/Tools/Sort.vue").default
  }
};
</script>

<style lang="scss">
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
