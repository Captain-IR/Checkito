<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div class="q-mt-lg">
      <ListHeader bgColor="bg-green-4">Completed</ListHeader>

      <q-list bordered separator>
        <Task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["tasksCompleted"],
  components: {
    Task: require("components/Tasks/Task.vue").default,
    ListHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style></style>
