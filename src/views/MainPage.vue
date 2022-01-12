<template lang="pug">
el-card.box-card
  template(#header='')
    .card-header
      .header-container
        span.title Вычисление квадратного корня
        el-button(type='primary', @click="onCalculateClick") Рассчитать
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

  computed,

  ref,
  Ref ,
} from 'vue';

import { match, select } from 'ts-pattern';

interface EquationResult {
  x1: number | null,
  x2: number | null,
}

function getDescrimenant(a: number, b: number, c: number): number {
  return Math.pow(b, 2) - 4 * a * c;
}

function solveEquation(a: number, b: number, c: number): EquationResult {
  const descrimenant = getDescrimenant(a, b, c);

  if (descrimenant < 0) {
    return {
      x1: null,
      x2: null,
    }
  }

  if (descrimenant == 0) {
    return {
      x1: (-b + Math.sqrt(descrimenant)) / (2 * a),
      x2: null,
    }
  }

  return {
    x1: (-b + Math.sqrt(descrimenant)) / (2 * a),
    x2: (-b - Math.sqrt(descrimenant)) / (2 * a),
  }
}

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

    const equationResult: Ref<EquationResult | null> = ref(null);

    const onCalculateClick = () => {
      equationResult.value = solveEquation(
        form.A,
        form.B,
        form.C,
      )
    };

    const resultText = computed(() => {
      if (equationResult.value === null) {
        return 'Введите данные и нажмите кнопку "Рассчитать"...';
      }

      const generalTemplate = `
        <strong>A</strong>: ${form.A}<br/>
        <strong>B</strong>: ${form.B}<br/>
        <strong>C</strong>: ${form.C}<br/><br/>
      `;

      const descrimenant = getDescrimenant(form.A, form.B, form.C);

      const value = match(equationResult.value)
        .with({ x1: null, x2: null }, () => {
          return generalTemplate + `
            Дискриминант равен ${descrimenant}<br/>
            Уравнение не имеет корней. <br/>
          `;
        })
        .with({ x1: select(), x2: null }, (x1: number) => {
          return generalTemplate + `
            Дискриминант равен ${descrimenant}<br/>
            Уравнение имеет один корень. <br/>

            x1: ${x1}</br>
          `;
        })
        .with({ x1: select('x1'), x2: select('x2') }, ({ x1, x2 }) => {
          return generalTemplate + `
            Дискриминант равен ${descrimenant}<br/>
            Уравнение имеет два корня. <br/><br/>

            x1: ${x1}<br/>
            x2: ${x2}<br/>
          `;
        }).exhaustive();

      return value;
    });

    return {
      form,

      equationResult,

      resultText,
      onCalculateClick,
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
