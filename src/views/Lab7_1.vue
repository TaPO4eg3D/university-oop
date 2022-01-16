<template lang="pug">
el-card.box-card
  template(#header='')
    .card-header
      span.title ПОИСК КАТЕТА
  .card-body
    el-form
      el-form-item(label="1-ый катет: ")
        el-input-number(v-model="a")
      el-form-item(label="2-ый катет: ")
        el-input-number(v-model="b")
      el-form-item(label="Гипотенуза: ")
        el-input-number(disabled, :model-value="c")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const a = ref(1);
    const b = ref(1);

    const c = computed(() => {
      return (Math.sqrt(Math.pow(a.value, 2) + Math.pow(b.value, 2))).toFixed(2);
    });

    return {
      a, b, c,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
