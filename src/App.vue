<template lang="pug">
.app
  el-button(
    type="primary",
    v-if="showBackButton",
    @click="openPage('/')"
  ).back-button Назад в меню

  router-view
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    
    const showBackButton = computed(() => {
      return router.currentRoute.value.path !== '/'
        && !router.currentRoute.value.path.includes('lab7_');
    });

    const openPage = (link: string) => {
      router.push(link);
    };

    return {
      openPage,
      showBackButton,
    }
  },
})
</script>

<style lang="scss" scoped>
.back-button {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
