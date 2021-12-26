<template>
  <div class="mb-4">Hello world</div>
  <primary-button :loading="false">Click me bitch</primary-button>
</template>

<script>
  import PrimaryButton from './../components/Buttons/PrimaryButton.vue';
  export default {
    components: {
      PrimaryButton,
    },
    name: 'Home',
    PrimaryButton,
  };
</script>
