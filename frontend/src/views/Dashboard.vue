<template>
  <auth-layout :headline="headline">
    <div>dashboard</div>
    <div @click="googleLogout">Logout with google</div>
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
    methods: {
      async googleLogout() {
        window.localStorage.removeItem('access_token');
        this.$store.dispatch('logout');
      },
    },
  };
</script>
