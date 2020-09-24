<template>
  <div class="row q-mb-sm">
    <!-- autofocus removed -->
    <q-input
      @input="$emit('update:name', $event)"
      outlined
      v-select-all
      clearable
      label="Title"
      class="col"
      ref="name"
      :value="name"
      :rules="[val => !!val || 'Field is required']"
    >
      <template v-slot:append> </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>

<style></style>
