<template>
  <div class="flex justify-center items-center">
    <div
      :class="`animate-spin rounded-full border-b-2 border-gray-900 ${
        size === 'large' ? 'h-32 w-32' : 'w-16 h-16'
      }`"
    ></div>
  </div>
</template>
<script>
  export default {
    props: ['size'],
  };
</script>
