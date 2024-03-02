<template>
  <div ref="wordmark" class="text-emerald-600 inline-flex items-center gap-x-2">
    <Logo class="w-16 h-16" />
    <span class="font-bold text-4xl">Polyengine</span>
  </div>
  <img :src="png" />
</template>

<script setup lang="ts">
// @ts-expect-error
import domtoimage from "dom-to-image";

const wordmark = ref();
const png = ref();

onMounted(() => {
  console.log(wordmark.value);
  domtoimage.toPng(wordmark.value).then((dataUrl: string) => {
    png.value = dataUrl;
  });
});

definePageMeta({
  layout: false,
});
</script>
