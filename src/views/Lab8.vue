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
                el-radio(
                  v-model="selectedColor",
                  :label="drawingElement.id",
                  @change="onDrawingElementChange",
                ) {{ drawingElement.name }}
            .color-picker(ref='colorPickerContainer')
      el-col(:span="12")
        el-card.box-card.tool-card
          template(#header='')
            .card-header
              span.title Инструменты
          .card-body
            el-radio(v-model="selectedTool", label="1") Отрезок
            el-radio(v-model="selectedTool", label="2") Элипс
            el-radio(v-model="selectedTool", label="3") Прямоугольник
  .drawing-area(style="margin-top: 20px")
    el-card.box-card
      template(#header='')
        .card-header
          span.title Канвас
      .card-body(ref="canvasElement")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

import Konva from 'konva';
import ColorPicker from 'simple-color-picker';

export default defineComponent({
  setup() {
    const selectedTool = ref('1');
    const selectedColor = ref('1');
    const canvasElement = ref();

    const colorPickerContainer = ref();

    const cPicker = ref();

    const konvaStage = ref();
    let mainLayer: any = null;
    let stageBackground: any = null;

    const drawingElements = ref([
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
    ]);

    const selectedLineColor = computed(() => {
      return drawingElements.value[0].color;
    });

    const selectedBackgroundColor = computed(() => {
      return drawingElements.value[1].color;
    });

    const selectedFill = computed(() => {
      return drawingElements.value[2].color;
    });

    const onDrawingElementChange = () => {
      const selectedElement = drawingElements.value.find((elem) => {
        return elem.id === selectedColor.value;
      })

      if (!selectedElement) {
        return;
      }

      cPicker.value.setColor(selectedElement.color);
    };

    const onColorChange = (color: string) => {
      const selectedElement = drawingElements.value.find((elem) => {
        return elem.id === selectedColor.value;
      })

      if (!selectedElement) {
        return;
      }

      selectedElement.color = color;

      if (selectedColor.value === '2') {
        stageBackground.fill(color);
        mainLayer.draw();
      }
    };

    onMounted(() => {
      cPicker.value = new ColorPicker({
        el: colorPickerContainer.value,
      })
      cPicker.value.onChange(onColorChange);
    });

    let newElement: any = null;
    let startX = 0;
    let startY = 0;

    const onStageClick = (e: any) => {
      const x = e.evt.layerX;
      const y = e.evt.layerY;

      startX = x;
      startY = y;

      switch (selectedTool.value) {
        case '1':
          newElement = new Konva.Line({
            fill: selectedFill.value,
            points: [x, y],
            stroke: selectedLineColor.value,
            storkeWidth: 8,
          });
          break;
        case '2':
          newElement = new Konva.Ellipse({
            fill: selectedFill.value,
            x, y,
            radiusX: 0,
            radiusY: 0,
            stroke: selectedLineColor.value,
            storkeWidth: 4,
          });
          break;
        case '3':
          newElement = new Konva.Rect({
            fill: selectedFill.value,
            x, y,
            stroke: selectedLineColor.value,
            storkeWidth: 4,
          });
          break;
      }

      mainLayer.add(newElement);
      mainLayer.draw();
    };

    const onStageDrag = (e: any) => {
      if (!newElement) {
        return;
      }

      const x = e.evt.layerX;
      const y = e.evt.layerY;

      switch (selectedTool.value) {
        case '1':
          newElement.points([startX, startY, x, y]);
          break;
        case '2':
          newElement.radiusX(x - startX);
          newElement.radiusY(y - startY);
          break;
        case '3':
          newElement.width(x - startX);
          newElement.height(y - startY);
          break;
      }

      mainLayer.draw();
    };

    const onStageFinish = () => {
      newElement = null;
    };

    onMounted(() => {
      konvaStage.value = new Konva.Stage({
        container: canvasElement.value,
        width: canvasElement.value.clientWidth,
        height: canvasElement.value.clientHeight,
      });

      konvaStage.value.on('mousedown', onStageClick);
      konvaStage.value.on('mousemove', onStageDrag);
      konvaStage.value.on('mouseup', onStageFinish);

      mainLayer = new Konva.Layer();
      stageBackground = new Konva.Rect({
        fill: '#000',
        width: konvaStage.value.width(),
        height: konvaStage.value.height(),
        x: 0,
        y: 0,
      });

      mainLayer.add(stageBackground);
      konvaStage.value.add(mainLayer);

      mainLayer.draw();
    });

    return {
      selectedTool,
      selectedColor,
      drawingElements,
      canvasElement,
      onDrawingElementChange,
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

.drawing-area {
  .card-body {
    min-height: 440px;
  }
}
</style>
