<template><div>Google Login</div></template>

<script>
  export default {
    data() {
      return {
        slug: '',
      };
    },
    async beforeCreate() {
      try {
        const user = await this.axios.get(
          `http://localhost:3000${this.$route.fullPath}`,
        );
        console.log(user);
      } catch (error) {
        console.log(error.response.status);
      }
    },
  };
</script>
