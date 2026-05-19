<script lang="ts" setup>
import { ref, onMounted } from "vue";
import MingcuteMoonLine from "~icons/mingcute/moon-line";
import MingcuteSunLine from "~icons/mingcute/sun-line";

const isDark = ref(false);
const label = ref("切换主题");

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
  const parent = document.querySelector("[data-label]");
  if (parent) {
    label.value = parent.getAttribute("data-label") || "切换主题";
  }
});

function toggle() {
  document.documentElement.classList.add("wi-theme-transition");
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("wi-theme", isDark.value ? "dark" : "light");
  setTimeout(() => {
    document.documentElement.classList.remove("wi-theme-transition");
  }, 300);
}
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <MingcuteSunLine v-if="isDark" />
    <MingcuteMoonLine v-else />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--ink-2);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.theme-toggle:hover {
  background: var(--bg-raised);
  color: var(--ink);
}
</style>
