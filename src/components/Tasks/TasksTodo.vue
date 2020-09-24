<template>
  <div>
    <ListHeader bgColor="bg-orange-4">Todo</ListHeader>

    <q-list bordered separator>
      <Task
        v-for="(task, key) in tasksTodo"
        :key="key"
        :task="task"
        :id="key"
      />
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["tasksTodo"],
  components: {
    Task: require("components/Tasks/Task.vue").default,
    ListHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style></style>
