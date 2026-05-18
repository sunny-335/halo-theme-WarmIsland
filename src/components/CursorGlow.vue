<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const glowEl = ref<HTMLElement | null>(null);
const visible = ref(false);
var rafId = 0;

function handleMouseMove(e: MouseEvent) {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    if (glowEl.value) {
      glowEl.value.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }
    rafId = 0;
  });
  visible.value = true;
}

function handleMouseLeave() {
  visible.value = false;
}

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("mouseleave", handleMouseLeave);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    ref="glowEl"
    class="wi-cursor-glow"
    :class="{ 'wi-cursor-glow--visible': visible }"
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
