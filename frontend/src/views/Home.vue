<template>
  <div>
    <div class="mb-4">Hello world</div>
    <primary-button :loading="false" @click="googleLogin()"
      >Click me bitch</primary-button
    >
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
