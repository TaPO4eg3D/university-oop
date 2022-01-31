<template lang="pug">
el-card.box-card
  template(#header='')
    .card-header
      span.title Меню
  .card-body
    el-button(type="primary", @click="openModalWindow(1)") Найти катет
    el-button(type="primary", @click="openModalWindow(2)") Найти скорость и расстояние
    el-button(type="primary", @click="openModalWindow(3)") Вычисление формул
    el-button(type="primary", @click="openModalWindow(4)") Выбор вычислений
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ipcRenderer } from 'electron';

export default defineComponent({
  setup() {
    const openModalWindow = (index: number) => {
      if (process.env.NODE_ENV === 'development') {
        window.open(`/lab7_${index}`);
      } else {
        const modalPath = `app://./index.html#lab7_${index}`;
        ipcRenderer.send('openModal', modalPath);
      }
    };

    return {
      openModalWindow,
    }
  },
})
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
}

.card-body {
  position: relative;
  top: -10px;
  display: flex;
  flex-wrap: wrap;
}

.el-button {
  margin: 0;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
