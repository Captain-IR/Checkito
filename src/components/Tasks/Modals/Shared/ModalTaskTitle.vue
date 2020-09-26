<template>
  <div class="row q-mb-sm">
    <!-- autofocus removed -->
    <q-input
      @input="$emit('update:title', $event)"
      outlined
      v-select-all
      clearable
      label="Title"
      class="col"
      ref="title"
      :value="title"
      :rules="[val => !!val || 'Field is required']"
    >
      <template v-slot:append> </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["title"],
  directives: {
    selectAll
  }
};
</script>

<style></style>
