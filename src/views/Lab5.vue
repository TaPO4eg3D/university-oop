<template lang="pug">
.lab5
  el-card.box-card
    template(#header='')
      .card-header
        span.title Построение диаграммы
    .card-body
      el-button(type="primary", @click="addNewProduct") Добавить продукт
      el-table(
        :data="tableData",
        style="width: 100%; margin-top: 20px",
        stripe,
      )
        el-table-column(label="Name")
          template(#default="scope")
            el-input(:model-value="scope.row.name", @input="handleEdit(scope.$index, 'name', $event)")
        el-table-column(label="Price")
          template(#default="scope")
            el-input(
              :model-value="scope.row.price",
              @input="handleEdit(scope.$index, 'price', $event)",
              type="number",
              min="0",
            )
        el-table-column(label="Amount")
          template(#default="scope")
            el-input-number(
              :model-value="scope.row.amount",
              @input="handleEdit(scope.$index, 'amount', $event)",
              :min="0",
            )
        el-table-column(label="Total")
          template(#default="scope")
            el-input(disabled, :model-value="(scope.row.price || 0) * (scope.row.amount || 0)")
  el-card.box-card(style="margin-top: 20px")
    template(#header='')
      .card-header
        span.title Диаграмма
    .card-body
      canvas(ref="ctx")
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted }  from 'vue'

import { Chart, registerables } from 'chart.js';

interface TableRecord {
  name: string;
  price: number;
  amount: number;
}

export default defineComponent({
  setup() {
    const ctx = ref();
    const tableData: Ref<TableRecord[]> = ref([]);

    let chart: any = null;
    let productCounter = 1;

    onMounted(() => {
      Chart.register(...registerables);
      chart = new Chart(ctx.value, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Chart',
                data: [],
                backgroundColor: [],
            }]
        },
      });
    });

    const getDynamicColor = () => {
      const getColor = () => Math.floor(Math.random() * 255);
      return `rgba(${getColor()}, ${getColor()}, ${getColor()}, 1.0)`
    };

    const addNewProduct = () => {
      const tableRecord: TableRecord = {
        name: 'Новый продукт ' + productCounter,
        price: 100,
        amount: 1,
      };
      productCounter += 1;

      tableData.value.push(tableRecord);

      chart.data.labels.push(tableRecord.name);
      chart.data.datasets.forEach((dataset: any) => {
          dataset.data.push(tableRecord.price * tableRecord.amount)
          dataset.backgroundColor.push(getDynamicColor())
      });
      chart.update();
    };

    const handleEdit = (index: number, fieldName: string, value: any) => {
      const validatedValue = (() => {
        if (fieldName == 'price' || fieldName == 'amount') {
          return value < 0 ? null : value;
        }

        return value;
      })();

      // @ts-ignore
      tableData.value[index][fieldName] = validatedValue;
      const tableRecord = tableData.value[index];

      if (fieldName === 'name') {
        chart.data.labels[index] = validatedValue;
      }

      chart.data.datasets.forEach((dataset: any) => {
          dataset.data[index] = tableRecord.price * tableRecord.amount;
      });

      chart.update();
    };

    return {
      ctx,
      tableData,

      addNewProduct,
      handleEdit,
    };
  },
})
</script>

<style lang="scss" scoped>
.card-header {
  .title {
    text-transform: uppercase;
  }
}
</style>
