<template lang="pug">
.lab8
  .control-panel
    el-row(:gutter="20")
      el-col(:span="12")
        el-card.box-card.color-card
          template(#header='')
            .card-header
              span.title Палитра
          .card-body
            .drawing-elements
              .drawing-element(v-for="drawingElement in drawingElements")
                .color-box(:style="{ backgroundColor: drawingElement.color }")
                el-radio {{ drawingElement.name }}
            .color-picker(ref='colorPickerContainer')
      el-col(:span="12")
        el-card.box-card.tool-card
          template(#header='')
            .card-header
              span.title Инструменты
          .card-body
            el-radio Отрезок
            el-radio Элипс
            el-radio Прямоугольник
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import ColorPicker from 'simple-color-picker';

export default defineComponent({
  setup() {
    const selectedTool = ref('1');
    const colorPickerContainer = ref();

    const cPicker = ref();

    const drawingElements = [
      {
        id: '1',
        name: 'Линия',
        color: '#000',
      },
      {
        id: '2',
        name: 'Фон',
        color: '#000',
      },
      {
        id: '3',
        name: 'Заливка',
        color: '#000',
      }
    ];

    onMounted(() => {
      cPicker.value = new ColorPicker({
        el: colorPickerContainer.value,
      })
    });

    return {
      selectedTool,
      drawingElements,
      colorPickerContainer,
    };
  },
})
</script>

<style lang="scss" scoped>
.drawing-elements {
  display: flex;
  flex-direction: column;
}

.color-picker {
  margin-left: auto;
}

.drawing-element {
  display: flex;
  align-items: center;
}

.color-box {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  margin-right: 10px;
}

.color-card .card-body {
  display: flex;
}

::v-deep(.tool-card) {
  height: 99%;
}

.tool-card .card-body {
  display: flex;
  flex-direction: column;
}
</style>
