<template>
  <div
    :class="`bg-white p-4 flex flex-col justify-center rounded-lg shadow-xl ${
      center ? 'items-center' : 'items-start'
    }`"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['center'],
  };
</script>
