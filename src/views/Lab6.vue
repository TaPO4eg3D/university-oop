<template lang="pug">
.lab6
  el-card.box-card    
    template(#header='')
      .card-header
        span.title Параметры
    .card-body
      el-form
        el-form-item(label="Скорость: ")
          el-input-number(v-model="speed", :min="1")
  el-card.box-card(style="margin-top: 20px")
    template(#header='')
      .card-header
        span.title Доска
    .card-body
      canvas(ref="ctx")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, watch, onUnmounted } from 'vue'

interface BallOptions {
  speed: Ref<number>;
}

const constructBall = (ctx: HTMLCanvasElement, opt: BallOptions) => {
  const parent = ctx.parentElement;
  if (!parent) {
    return;
  }

  ctx.width = parent.clientWidth;
  ctx.height = 400;

  const handleResize = () => {
    ctx.width = parent.clientWidth;
    ctx.height = 400;
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  let x = Math.floor(Math.random() * ctx.width - 20);
  let y = Math.floor(Math.random() * ctx.height - 20);

  let vx = 2;
  let vy = 4;

  watch(opt.speed, (v) => {
    vx = vx < 0 ? -v : v;
    vy = vy < 0 ? -v : v;
  });
  
  const radius = 20;
  const context = ctx.getContext('2d');

  move();
 
  function move() {
      if (!context) {
        console.error('Error while creating canvas context!');

        return;
      }

      requestAnimationFrame(move);

      context.clearRect(0, 0, ctx.width, ctx.height);

      // Creating a circle
      context.beginPath();
      context.strokeStyle = "black";
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.stroke();

      if (radius + x > ctx.width)
          vx = 0 - vx;

      if (x - radius < 0)
          vx = 0 - vx;

      if (y + radius > ctx.height)
          vy = 0 - vy;

      if (y - radius < 0)
          vy = 0 - vy;

      x = x + vx;
      y = y + vy;
  }
};

export default defineComponent({
  setup() {
    const ctx = ref();
    const speed = ref(6);

    onMounted(() => {
      constructBall(ctx.value, { speed });
    });

    return {
      ctx,
      speed,
    }
  },
})
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
}
</style>
