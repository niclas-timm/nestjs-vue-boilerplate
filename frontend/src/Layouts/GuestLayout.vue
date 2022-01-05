<template>
  <base-layout :headline="headline">
    <template #header>
      <default-navbar></default-navbar>
    </template>

    <slot></slot>
  </base-layout>
</template>

<script>
  import DefaultNavbar from '../components/Navigation/DefaultNavbar.vue';
  import BaseLayout from './BaseLayout.vue';
  import Spinner from '../components/Widgets/Spinner/Spinner.vue';

  export default {
    data() {
      return {
        loading: true,
      };
    },
    props: ['headline'],
    components: { BaseLayout, DefaultNavbar, Spinner },
    async beforeCreate() {
      await this.$store.dispatch('fetchUser');
      if (
        !this.$store.state.auth.loadingUser &&
        !this.$store.state.auth.isAuthenticated
      ) {
        return;
      }
      if (
        !this.$store.state.auth.loadingUser &&
        this.$store.state.auth.isAuthenticated
      ) {
        this.$router.push('/dashboard');
      }
      this.loading = false;
    },
  };
</script>
