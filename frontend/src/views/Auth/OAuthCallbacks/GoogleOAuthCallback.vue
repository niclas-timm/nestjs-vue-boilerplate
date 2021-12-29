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

    async beforeCreate() {
      // Forward the request to the backend.
      const loginSuccess = await this.$store.dispatch(
        'socialAuth',
        `${process.env.VUE_APP_API_URL}${this.$route.fullPath}`,
      );

      // If the login was successfull, redirect to dashboard.
      if (loginSuccess) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/login');
      }
    },
  };
</script>
