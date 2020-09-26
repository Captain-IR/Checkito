export default {
  methods: {
    submitForm: function() {
      this.$refs.modalTaskTitle.$refs.title.validate();
      if (!this.$refs.modalTaskTitle.$refs.title.hasError) {
        this.submitTask();
      }
    }
  },
  components: {
    ModalHeader: require("components/Tasks/Modals/Shared/ModalHeader.vue")
      .default,
    ModalTaskTitle: require("components/Tasks/Modals/Shared/ModalTaskTitle.vue")
      .default,
    ModalDueDate: require("components/Tasks/Modals/Shared/ModalDueDate.vue")
      .default,
    ModalDueTime: require("components/Tasks/Modals/Shared/ModalDueTime.vue")
      .default,
    ModalButtons: require("components/Tasks/Modals/Shared/ModalButtons.vue")
      .default
  }
};
