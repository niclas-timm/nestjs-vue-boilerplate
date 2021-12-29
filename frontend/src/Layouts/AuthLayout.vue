<template>
  <base-layout :headline="headline">
    <template #header>
      <default-navbar></default-navbar>
    </template>

    <div v-if="$store.state.auth.loadingUser">
      <!-- Loading spinner -->
      <spinner size="large"></spinner>
    </div>
    <div
      v-else-if="
        !$store.state.auth.loadingUser && $store.state.auth.isAuthenticated
      "
    >
      <!-- Child components -->
      <slot></slot>
    </div>
    <div v-else>You are not authorized to access this page.</div>
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
    },
  };
</script>
