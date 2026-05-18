<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);
const visible = ref(false);

function handleMouseMove(e: MouseEvent) {
  x.value = e.clientX;
  y.value = e.clientY;
  visible.value = true;
}

function handleMouseLeave() {
  visible.value = false;
}

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);
});
</script>

<template>
  <div
    class="wi-cursor-glow"
    :class="{ 'wi-cursor-glow--visible': visible }"
    :style="{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }"
  />
</template>

<style scoped>
.wi-cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(212, 118, 78, 0.06) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: transform;
}

.wi-cursor-glow--visible {
  opacity: 1;
}

html.dark .wi-cursor-glow {
  background: radial-gradient(
    circle,
    rgba(232, 149, 95, 0.04) 0%,
    transparent 70%
  );
}
</style>
