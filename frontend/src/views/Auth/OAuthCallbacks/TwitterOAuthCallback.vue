<template>
  <div class="w-screen h-screen flex justif-center items-center">
    <spinner :size="large"></spinner>
  </div>
</template>

<script>
  import Spinner from '../../../components/Widgets/Spinner/Spinner.vue';
  export default {
    components: {
      Spinner,
    },

    /**
     * Retrieve access token from url param. Use it to fetch the current user.
     */
    async beforeCreate() {
      const token = this.$route.query.token;
      if (!token) {
        return this.$router.push('/login');
      }
      window.localStorage.setItem('access_token', token);
      const user = await this.$store.dispatch('fetchUser');
      if (user) {
        return this.$router.push('/dashboard');
      }
      return this.$router.push('/login');
    },
  };
</script>
