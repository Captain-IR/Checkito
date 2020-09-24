<template>
  <q-card>
    <ModalHeader>Add Task</ModalHeader>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <ModalTaskName 
        :name.sync="taskToSubmit.name" 
        ref="modalTaskName"/>

        <ModalDueDate :dueDate.sync="taskToSubmit.dueDate" />

        <ModalDueTime
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <ModalButtons  />

    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm: function() {
      this.$refs.modalTaskName.$refs.name.validate();
      console.log(this.$refs.name);
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask: function() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  },
  components: {
    ModalHeader: require("components/Tasks/Modals/Shared/ModalHeader.vue")
      .default,
    ModalTaskName: require("components/Tasks/Modals/Shared/ModalTaskName.vue")
      .default,
    ModalDueDate: require("components/Tasks/Modals/Shared/ModalDueDate.vue")
      .default,
    ModalDueTime: require("components/Tasks/Modals/Shared/ModalDueTime.vue")
      .default,
    ModalButtons: require("components/Tasks/Modals/Shared/ModalButtons.vue")
      .default,
  }
};
</script>

<style></style>
