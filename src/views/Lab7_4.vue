<template lang="pug">
.lab7_3
  el-row(:gutter="20")
    el-col(:span="12")
      el-card.box-card.data-card
        template(#header="")
          .card-header
            span Данные для расчета
        el-form
          el-form-item(label="A:")
            el-input-number(v-model="varA")
          el-form-item(label="B:")
            el-input-number(v-model="varB")
    el-col(:span="12")
      el-card.box-card
        template(#header="")
          .card-header
            span Способ расчета
        .choices
          el-checkbox(v-model="selectedX") X = A + B
          el-checkbox(v-model="selectedY") Y = A * B
          el-checkbox(v-model="selectedZ") Z = A + B
  el-row(style="margin-top: 20px;")
    el-col(:span="24")
      el-card.box-card
        template(#header="")
          .card-header
            span Результат
        .result
          .result-item(v-if="selectedX")
            strong X
            | 
            | = {{ varX }}
          .result-item(v-if="selectedY")
            strong Y
            | 
            | = {{ varY }}
          .result-item(v-if="selectedZ")
            strong Z
            | 
            | = {{ varZ }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const varA = ref(1);
    const varB = ref(1);

    const selectedX = ref(true);
    const selectedY = ref(false);
    const selectedZ = ref(false);

    const varX = computed(() => {
      return varA.value + varB.value;
    });

    const varY = computed(() => {
      return varA.value * varB.value;
    });

    const varZ = computed(() => {
      return varA.value + varB.value;
    });

    return {
      varA,
      varB,

      varX,
      varY,
      varZ,

      selectedX,
      selectedY,
      selectedZ,
    }
  },
})
</script>

<style lang="scss" scoped>
.data-card {
  height: 100%;
}

.choices {
  display: flex;
  flex-direction: column;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
