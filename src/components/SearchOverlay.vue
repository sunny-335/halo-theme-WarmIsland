<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    const searchWidget = (window as any).SearchWidget;
    if (searchWidget && typeof searchWidget.open === "function") {
      searchWidget.open();
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <span class="wi-search-hint" aria-hidden="true">
    <kbd class="wi-search-hint__key">⌘</kbd>
    <kbd class="wi-search-hint__key">K</kbd>
  </span>
</template>

<style scoped>
.wi-search-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  user-select: none;
}

.wi-search-hint__key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  color: var(--ink-3);
  background: var(--bg-raised);
  border: 1px solid var(--rule);
  border-radius: 6px;
  box-shadow: 0 1px 0 var(--rule);
}
</style>
