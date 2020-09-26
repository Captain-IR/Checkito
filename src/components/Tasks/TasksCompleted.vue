<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div :class="{ 'q-mt-lg': !settings.showTasksInOneList }">
      <ListHeader v-if="!settings.showTasksInOneList" bgColor="bg-green-4"
        >Completed</ListHeader
      >

      <q-list bordered separator>
        <Task
        v-for="task in tasksCompleted"
        :key="task.id"
        :task="task"
      />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["tasksCompleted"],
  computed: {
    ...mapGetters("settings", ["settings"])
  },
  components: {
    Task: require("components/Tasks/Task.vue").default,
    ListHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style></style>
