<template>
  <q-route-tab :to="link" exact :icon="icon" :label="title" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>
