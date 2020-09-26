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
  mixins:  [mixinAddEditTask],
  data: function() {
    return {
      taskToSubmit: {
        title: "",
        completed: false,
        dueDate: "",
        dueTime: "",
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTodo"]),
    submitTask: function() {
      this.addTodo(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>

<style></style>
