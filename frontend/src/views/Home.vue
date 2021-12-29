<template>
  <div>
    <div class="mb-4">Hello world</div>
    <div>
      {{
        $store.state.auth.user.name
          ? $store.state.auth.user.name
          : 'Not logged in'
      }}
    </div>
  </div>
</template>

<script>
  import PrimaryButton from './../components/Buttons/PrimaryButton.vue';
  export default {
    components: {
      name: 'Home',
      PrimaryButton,
    },
    methods: {
      googleLogin() {
        window.location = 'http://localhost:3000/auth/google';
      },
    },
  };
</script>
