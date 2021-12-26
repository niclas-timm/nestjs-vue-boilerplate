<template>
  <button-base
    :loading="loading"
    class="primary-button bg-primary hover:bg-gray-700 active:bg-gray-900 focus:border-gray-900 focus:ring-gray-300 text-white"
  >
    <slot></slot>
  </button-base>
</template>
<script>
  import ButtonBase from './ButtonBase.vue';
  export default {
    components: {
      ButtonBase,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
