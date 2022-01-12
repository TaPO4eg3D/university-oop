<template lang="pug">
el-card.box-card
  template(#header='')
    .card-header
      .header-container
        span.title Сортировка по убыванию
        el-button(type='primary', @click="onSortClick") Сортировать
  .data-input
    el-row(:gutter="20")
      el-col(:span="6")
        el-form(:model="form")
          el-form-item(label="A:")
            el-input-number(v-model="form.A", :min="1")
          el-form-item(label="B:")
            el-input-number(v-model="form.B")
          el-form-item(label="C:")
            el-input-number(v-model="form.C")
      el-col(:span="18")
        .result
          el-divider(direction="vertical")
          div.result__output
            div.result__output-inner(v-html="resultText")
</template>

<script lang="ts">
import { 
  defineComponent,
  reactive,
  ref,
} from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const form = reactive({
      A: 1,
      B: 2,
      C: 3,
    });

    const resultText = ref('Введите данные и нажмите кнопку "Сортировать"...');

    const onSortClick = () => {
      const sortedData = Object.entries(form).sort(([_key1, value1], [_key2, value2]) => {
        return value2 - value1;
      })
      
      resultText.value = '';
      
      sortedData.forEach(([key, value]) => {
        resultText.value += `<strong>${key}:</strong> ${value}</br>`;
      });
    };

    return {
      form,

      resultText,
      onSortClick,
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
}

.header-container {
  user-select: none;

  display: flex;
  align-items: center;

  .el-button {
    margin-left: auto;
  }
}

.data-input {
  user-select: none;
  
  .el-row {
    min-height: 210px;
  }
}

.result {
  display: flex;
  height: 100%;

  .el-divider {
    height: 90%;
  }

  &__output {
    font-size: 16px;

    background-color: #ededed;

    width: 100%;
    height: 90%;

    margin-left: 25px;

    border: 1px solid #d6d6d6;
    border-radius: 10px;
  }

  &__output-inner {
    padding: 15px;
  }
}
</style>
