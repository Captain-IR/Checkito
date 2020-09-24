<template>
  <div class="row q-mb-sm">
    <q-input
      @input="$emit('update:name', $event)"
      outlined
      autofocus
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
export default {
  props: ["name"]
};
</script>

<style></style>
