<template lang="pug">
.lab4
  el-card.box-card
    template(#header)
      .card-header
        span Настройка матриц
    el-form(:model="inputForm")
      el-form-item(label="Количество строк:")
        el-input-number(v-model="inputForm.rowNumber")
      el-form-item(label="Количество колонок:")
        el-input-number(v-model="inputForm.columnNumber")
  el-row(:gutter="20", style="margin-top: 20px")
    el-col(:span="12")
      el-card.box-card.matrix-a
        template(#header)
          .card-header
            span Матрица А
        .matrix-card-body
          table.matrix-table
            thead
              th #
              th(v-for="i in inputForm.columnNumber") {{ i }}
            tbody
              tr(v-for="i in inputForm.rowNumber")
                td(style="padding-right: 10px") {{ i }}
                td(v-for="j in inputForm.columnNumber", style="padding-right: 5px")
                  el-input-number(
                    :model-value="matrixA[i - 1][j - 1]",
                    @change="changeMatrixValue(matrixA, i-1, j-1, $event)",
                  )
    el-col(:span="12")
      el-card.box-card.matrix-b
        template(#header)
          .card-header
            span Матрица B
        .matrix-card-body
          table.matrix-table
            thead
              th #
              th(v-for="i in inputForm.columnNumber") {{ i }}
            tbody
              tr(v-for="i in inputForm.rowNumber")
                td(style="padding-right: 10px") {{ i }}
                td(v-for="j in inputForm.columnNumber", style="padding-right: 5px")
                  el-input-number(
                    :model-value="matrixB[i - 1][j - 1]",
                    @change="changeMatrixValue(matrixB, i-1, j-1, $event)",
                  )
  el-row
    el-col(:span="24", style="margin-top: 20px")
      el-card.box-card.matrix-c
        template(#header)
          .card-header
            span Результат
        .matrix-card-body
          table.matrix-table
            thead
              th #
              th(v-for="i in inputForm.columnNumber") {{ i }}
            tbody
              tr(v-for="i in inputForm.rowNumber")
                td(style="padding-right: 10px") {{ i }}
                td(v-for="j in inputForm.columnNumber", style="padding-right: 5px")
                  el-input-number(
                    :model-value="matrixC[i - 1][j - 1]",
                  )
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const inputForm = reactive({
      rowNumber: 0,
      columnNumber: 0,
    });

    const matrixA = ref([] as any[]);
    const matrixB = ref([] as any[]);

    watch(() => [inputForm.rowNumber, inputForm.columnNumber], (
      [newRowNumber, newColumnNumber], [oldRowNumber, oldColumnNumber]
    ) => {
      if (newRowNumber > oldRowNumber) {
        const diff = newRowNumber - oldRowNumber;

        for (let i = 0; i < diff; i++) {
          const newRow = [];

          for (let i = 0; i < newColumnNumber; i++) {
            newRow.push(0);
          }

          matrixA.value.push([...newRow]);
          matrixB.value.push([...newRow]);
        }
      }

      if (oldRowNumber > newRowNumber) {
        const diff = oldRowNumber - newRowNumber;
        const rowNumber = matrixA.value.length;

        matrixA.value.splice(rowNumber - diff);
        matrixB.value.splice(rowNumber - diff);
      }

      if (newColumnNumber > oldColumnNumber) {
        const diff = newColumnNumber - oldColumnNumber;

        matrixA.value.forEach(row => {
          for (let i = 0; i < diff; i++) {
            row.push(0);
          }
        });

        matrixB.value.forEach(row => {
          for (let i = 0; i < diff; i++) {
            row.push(0);
          }
        });
      }

      if (oldColumnNumber > newColumnNumber) {
        const diff = oldColumnNumber - newColumnNumber;

        matrixA.value.forEach(row => {
          for (let i = 0; i < diff; i++) {
            row.splice(row.length - diff)
          }
        });

        matrixB.value.forEach(row => {
          for (let i = 0; i < diff; i++) {
            row.splice(row.length - diff)
          }
        });
      }
    });

    const changeMatrixValue = (matrix: any, row: number, column: number, value: number) => {
      matrix[row][column] = value;
    };

    const matrixC = computed(() => {
      const resultMatrix = [];

      for (let i = 0; i < inputForm.rowNumber; i++) {
        const row = [];

        for (let j = 0; j < inputForm.columnNumber; j++) {
          row.push(matrixA.value[i][j] + matrixB.value[i][j]);
        }

        resultMatrix.push(row);
      }

      return resultMatrix;
    });

    return {
      inputForm,

      matrixA,
      matrixB,
      matrixC,

      changeMatrixValue,
    };
  },
})
</script>

<style lang="scss" scoped>
.lab4 {
  user-select: none;
}

.matrix-card-body {
  overflow: auto;
}
</style>
