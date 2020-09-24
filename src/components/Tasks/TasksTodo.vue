<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <ListHeader v-if="!settings.showTasksInOneList" bgColor="bg-orange-4"
        >Todo</ListHeader
      >

      <q-list bordered separator>
        <Task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["tasksTodo"],
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
