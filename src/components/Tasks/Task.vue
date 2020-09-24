<template>
  <q-item
    clickable
    @click="updateTask({ id, updates: { completed: !task.completed } })"
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
    v-touch-hold:1000.mouse="showEditTaskModal"
    v-ripple
  >
    <q-item-section side>
      <q-checkbox v-model="task.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
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
            ><small>{{ task.dueTime }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { date } from "quasar";

export default {
  props: ["task", "id"],
  data: function() {
    return {
      showEditTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search"])
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    showEditTaskModal() {
      this.showEditTask = true;
    },
    promptToDelete: function(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    }
  },
  components: {
    EditTask: require("components/Tasks/Modals/EditTask.vue").default
  },
  filters: {
    niceDate: function(value) {
      return date.formatDate(value, "ddd MMM-D");
    },
    searchHighlight: function(value, search) {
      let searchRegExp = new RegExp(search, "gi");
      if (search) {
        return value.replace(searchRegExp, match => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    }
  }
};
</script>

<style></style>
