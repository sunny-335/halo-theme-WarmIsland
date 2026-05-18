<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  const animationEnabled = !document.documentElement.classList.contains(
    "wi-no-animations"
  );
  if (!animationEnabled) return;

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("wi-revealed");
          observer.value?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".wi-reveal").forEach((el) => {
    observer.value?.observe(el);
  });
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <slot />
</template>
