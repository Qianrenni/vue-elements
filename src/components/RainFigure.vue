<template>
  <div class="rain-figure-container">
    <div style="position: relative">
      <img ref="rainFigure" class="rain-image" :src="imageUrl" alt="" @load="resizeCanvas" />
      <canvas ref="rainCanvas" class="rain-canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Props
const props = defineProps<{
  imageUrl: string
}>()

// Refs
const rainCanvas = ref<HTMLCanvasElement | null>(null)
const rainFigure = ref<HTMLImageElement | null>(null)

// Canvas 上下文
let ctx: CanvasRenderingContext2D | null = null

// 雨滴数组
const drops = ref<Drop[]>([])

// 动画 ID
let animationId: number | null = null

// 初始化 canvas
function initCanvas() {
  const canvas = rainCanvas.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
}

// 调整 canvas 尺寸
function resizeCanvas() {
  const canvas = rainCanvas.value
  const container = rainFigure.value
  if (!canvas || !container || !ctx) return

  const dpr = window.devicePixelRatio || 1
  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight

  canvas.width = containerWidth * dpr
  canvas.height = containerHeight * dpr
  canvas.style.width = `${containerWidth}px`
  canvas.style.height = `${containerHeight}px`

  ctx.scale(dpr, dpr)
}

// 创建雨滴
function createDrops(count: number) {
  for (let i = 0; i < count; i++) {
    drops.value.push(new Drop(rainCanvas.value!))
  }
}

// 动画循环
function animate() {
  const canvas = rainCanvas.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drops.value.forEach((drop) => {
    drop.update()
    drop.draw(ctx!)
  })

  animationId = requestAnimationFrame(animate)
}

// 雨滴类
class Drop {
  x: number
  y: number
  length: number
  speed: number
  canvasWidth: number
  canvasHeight: number

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height - canvas.height
    this.length = Math.random() * 20 + 10
    this.speed = Math.random() * 5 + 10
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.length)
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  update() {
    this.y += this.speed
    if (this.y > this.canvasHeight) {
      this.y = -this.length
      this.x = Math.random() * this.canvasWidth
    }
  }
}

// mounted 生命周期
onMounted(() => {
  initCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 确保 DOM 渲染完成后再执行
  setTimeout(() => {
    resizeCanvas()
    createDrops(100)
    animate()
  }, 0)
})

// beforeUnmount 生命周期
onBeforeUnmount(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* 样式保持不变即可 */
.rain-figure-container {
  position: relative;
  width: 100%;
  height: var(--content-height-without-header);
  display: flex;
  justify-content: center;
}

.rain-image {
  max-height: 100%;
  max-width: 100%;
}

.rain-canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>