<template>
  <a href="#" class="tabs__item" :class="{ 'tabs__item--active': active }">{{
    tab.title
  }}</a>
</template>

<script>
export default {
  name: "Tab",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tab: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>