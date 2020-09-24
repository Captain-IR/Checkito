export default {
  methods: {
    submitForm: function() {
      this.$refs.modalTaskName.$refs.name.validate();
      console.log(this.$refs.name);
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
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
      .default
  }
};
