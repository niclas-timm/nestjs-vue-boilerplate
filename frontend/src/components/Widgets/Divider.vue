<template>
  <div
    class="flex w-full items-center text-gray-500 py-8"
    aria-orientation="horizontal"
  >
    <hr
      class="w-full border-t-1 border-r-0 border-l-0 border-b-0 border-gray-50"
    />
    <span class="px-2">
      {{ label }}
    </span>
    <hr
      class="w-full border-t-1 border-r-0 border-l-0 border-b-0 border-gray-50"
    />
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
    },
  };
</script>
