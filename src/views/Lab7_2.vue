<template lang="pug">
.lab7_2
  el-card.box-card
    template(#header='')
      .card-header
        span.title Исходные данные
    .card-body
      el-form(label-width="140px")
        el-form-item(label="Начальная скорость:")
          el-input(type="number", v-model="initialSpeed")
        el-form-item(label="Ускорение:")
          el-input(type="number", v-model="velocity")
        el-form-item(label="Время:")
          el-input(type="number", v-model="time")
  el-card.box-card(style="margin-top: 20px")
    template(#header='')
      .card-header
        span.title Результат
    .card-body
      el-form(label-width="140px")
        el-form-item(label="Конечная скорость:")
          el-input(type="number", :model-value="finalSpeed")
        el-form-item(label="Расстояние:")
          el-input(type="number", :model-value="distance")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const initialSpeed = ref(0);
    const velocity = ref(0);
    const time = ref(0);

    const finalSpeed = computed(() => {
      return initialSpeed.value + velocity.value * time.value;
    });

    const distance = computed(() => {
      return initialSpeed.value * time.value
        + velocity.value * Math.pow(time.value, 2) / 2;
    });

    return {
      initialSpeed,
      velocity,
      time,

      distance,
      finalSpeed,
    };
  },
})
</script>

<style lang="scss" scoped>

</style>
