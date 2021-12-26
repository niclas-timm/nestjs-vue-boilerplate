<template>
  <auth-layout :headline="headline">
    <div>dasboard</div>
  </auth-layout>
</template>
<script>
  import AuthLayout from '../Layouts/AuthLayout.vue';

  export default {
    data() {
      return {
        headline: 'Dashboard',
      };
    },
    components: { AuthLayout },
  };
</script>
