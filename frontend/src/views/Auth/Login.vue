<template>
  <guest-layout :headline="Login">
    <div class="w-full h-96 flex items-center justify-center">
      <card class="w-6/12 h-6/12" center="true">
        <span class="mb-12">
          <main-headline label="Login" class="mb-12"></main-headline>
        </span>

        <google-auth-button
          label="Login with Google"
          class="w-full"
          @click="loginWithGoogle"
        >
        </google-auth-button>
        <twitter-auth-button
          @click="loginWithTwitter"
          label="Login with Twitter"
          class="w-full mt-2"
        ></twitter-auth-button>

        <span class="w-full flex justify-between mt-3">
          <router-link to="/register">
            <span class="text-xs text-blue-700 underline"
              >Don't have an account yet?</span
            >
          </router-link>
        </span>
      </card>
    </div>
  </guest-layout>
</template>

<script>
  import GuestLayout from '../../Layouts/GuestLayout.vue';
  import GoogleAuthButton from '../../components/Buttons/Socials/GoogleAuthButton.vue';
  import TwitterAuthButton from '../../components/Buttons/Socials/TwitterAuthButton.vue';
  import Card from '../../components/Widgets/Card.vue';
  import MainHeadline from '../../components/Typography/MainHeadline.vue';
  export default {
    components: {
      GuestLayout,
      TwitterAuthButton,
      GoogleAuthButton,
      Card,
      MainHeadline,
    },
    methods: {
      loginWithGoogle() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/google`;
      },
      loginWithTwitter() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/twitter`;
      },
    },
  };
</script>
