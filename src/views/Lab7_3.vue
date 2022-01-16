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
          el-radio(label="1", size="large", v-model="selectedMethod") Y = A + B
          el-radio(label="2", size="large", v-model="selectedMethod") Y = A / B
          el-radio(label="3", size="large", v-model="selectedMethod") Y = A * B
  el-row(style="margin-top: 20px;")
    el-col(:span="24")
      el-card.box-card
        template(#header="")
          .card-header
            span Результат
        .result
          .result-item
            strong Y
            | 
            | = {{ varY }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const varA = ref(1);
    const varB = ref(1);

    const selectedMethod = ref('1');

    const varY = computed(() => {
      switch(selectedMethod.value) {
        case '1':
          return varA.value + varB.value;
        case '2':
          return varA.value / varB.value;
        case '3':
          return varA.value * varB.value;
      }
    });

    return {
      varA,
      varB,
      varY,

      selectedMethod,
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
</style>
