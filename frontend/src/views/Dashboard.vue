<template>
  <auth-layout :headline="headline">
    <div>Hi there, {{ $store.state.auth.user.name }}</div>

    <div>
      Thanks for using the NestJS Vue Boilerplate. I really hope you enjoy it so
      far!
    </div>
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
