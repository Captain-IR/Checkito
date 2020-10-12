<template>
  <q-item
    clickable
    @click="
      updateStatus({ id: task.id, updates: { completed: !task.completed } })
    "
    :class="task.completed ? 'bg-green-1' : 'bg-grey-2'"
    v-touch-hold:1000.mouse="showEditTaskModal"
    v-ripple
  >
    <q-item-section side>
      <q-checkbox v-model="task.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.title, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-sm"></q-icon>
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{
            task.dueDate | niceDate
          }}</q-item-label>
          <q-item-label class="row justify-end" caption
            ><small>{{ taskDueTime }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(task.id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask @close="showEditTask = false" :task="task" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { date } from "quasar";

export default {
  props: ["task"],
  data: function () {
    return {
      showEditTask: false,
    };
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime: function () {
      if (this.settings.show12HourTimeFormat) {
        return date.formatDate(
          this.task.dueDate + " " + this.task.dueTime,
          "h:mm:A"
        );
      }
      return this.task.dueTime;
    },
  },
  methods: {
    ...mapActions("tasks", ["updateStatus", "deleteTodo"]),
    showEditTaskModal() {
      this.showEditTask = true;
    },
    promptToDelete: function (taskId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTodo(taskId);
        });
    },
  },
  components: {
    EditTask: require("components/Tasks/Modals/EditTask.vue").default,
  },
  filters: {
    niceDate: function (value) {
      return date.formatDate(value, "ddd MMM-D");
    },
    searchHighlight: function (value, search) {
      let searchRegExp = new RegExp(search, "gi");
      if (search) {
        return value.replace(searchRegExp, (match) => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    },
  },
};
</script>

<style></style>
