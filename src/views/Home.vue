<template>
  <div class="home">
    <div class="container">
      <h1 class="page-title">Выберите способ доставки</h1>
      <tabs :currentTab="currentTab"
        ><tab
          @click.native="currentTab = tab"
          :tab="tab"
          :active="currentTab == tab"
          v-for="(tab, index) in tabs"
          :key="index"
        />
      </tabs>
      <tabs-content>
        <form-delivery v-if="currentTab.tag == 'delivery'" />
        <form-pickup v-if="currentTab.tag == 'pickup'" />
      </tabs-content>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import TabsContent from '@/components/TabsContent'
import FormDelivery from '../components/FormDelivery'
import FormPickup from '../components/FormPickup'
import Tab from '../components/Tab.vue'

export default {
  name: 'Home',
  components: {
    Tabs,
    Tab,
    TabsContent,
    FormDelivery,
    FormPickup,
  },
  data() {
    return {
      currentTab: { tag: 'delivery', title: 'Доставка' },
      tabs: [
        { tag: 'delivery', title: 'Доставка' },
        { tag: 'pickup', title: 'Самовывоз' },
      ],
    }
  },
  methods: {},
}
</script>
