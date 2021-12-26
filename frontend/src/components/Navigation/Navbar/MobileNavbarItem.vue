<template>
  <router-link
    :to="destination"
    :class="`${
      active ? 'bg-contrast' : ''
    } text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-contrast`"
    aria-current="page"
    >{{ label }}</router-link
  >
</template>
<script>
  export default {
    props: ['label', 'active', 'destination'],
  };
</script>
