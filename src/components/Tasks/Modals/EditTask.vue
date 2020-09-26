<template>
  <q-card>
    <ModalHeader>Add Task</ModalHeader>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <ModalTaskTitle :title.sync="taskToSubmit.title" ref="modalTaskTitle" />

        <ModalDueDate :dueDate.sync="taskToSubmit.dueDate" />

        <ModalDueTime
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <ModalButtons />
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task';

export default {
  mixins: [mixinAddEditTask],
  props: ["task"],
  data: function() {
    return {
      taskToSubmit: {}
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTodo"]),
    submitTask: function() {
      this.updateTodo({
        id: this.task.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },
  mounted() {
    this.taskToSubmit = { ...this.task };
  }
};
</script>

<style></style>
