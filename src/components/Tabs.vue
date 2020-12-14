<template>
  <div>
    <nav class="tabs" :class="{ 'tabs--open': isOpen }">
      <tabs-toggle />
      <div class="tabs__items">
        <slot></slot>
      </div>
    </nav>
  </div>
</template>

<script>
import TabsToggle from './TabsToggle.vue'
export default {
  name: 'Tabs',
  data() {
    return {
      isOpen: false,
    }
  },
  components: { TabsToggle },
  props: {
    currentTab: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
</style>