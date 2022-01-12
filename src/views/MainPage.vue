<template lang="pug">
el-table(:data="table", stripe)
  el-table-column(prop="name", label="Наименование", width="210")
  el-table-column(prop="description", label="Описание")
  el-table-column(label="", width="140")
    template(#default="scope")
      el-button(size="small", type="primary", @click="openPage(scope.row.link)")
        | Просмотреть
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const table = [
      {
        name: 'Лабораторная № 2',
        description: 'Найти квадратный корень',
        link: 'lab2',
      },
      {
        name: 'Лабораторная № 3',
        description: '',
        link: 'lab1',
      },
      {
        name: 'Лабораторная № 4',
        description: '',
        link: 'lab1',
      },
      {
        name: 'Лабораторная № 5',
        description: '',
        link: 'lab1',
      },
      {
        name: 'Лабораторная № 6',
        description: '',
        link: 'lab1',
      },
      {
        name: 'Лабораторная № 7',
        description: '',
        link: 'lab1',
      },
      {
        name: 'Лабораторная № 8',
        description: '',
        link: 'lab1',
      },
    ];

    const router = useRouter();

    const openPage = (link: string) => {
      router.push(link);
    };

    return {
      table,
      openPage,
    };
  },
})
</script>

<style lang="scss" scoped>
.el-table {
  user-select: none;
}
</style>
