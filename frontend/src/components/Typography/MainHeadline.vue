<template>
  <h1
    class="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white"
  >
    {{ label }}
  </h1>
</template>

<script>
  export default {
    props: ['label'],
  };
</script>
