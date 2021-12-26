<template>
  <button
    :type="type"
    class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring disabled:opacity-25 transition relative"
  >
    <div
      :class="{ invisible: !loading }"
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <div
        class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"
      ></div>
    </div>

    <div :class="{ invisible: loading }">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      type: {
        type: String,
        default: 'submit',
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
