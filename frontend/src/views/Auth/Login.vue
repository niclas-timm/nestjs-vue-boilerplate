<template>
  <guest-layout :headline="Login">
    <div class="w-full h-full flex items-center justify-center">
      <card class="w-6/12 h-6/12" center="true">
        <span class="mb-4">
          <main-headline label="Login" class="mb-2"></main-headline>
        </span>

        <span class="mb-6"
          >Don't have an account yet?
          <router-link to="/register">
            <span class="text-blue-700 underline">Register</span>
          </router-link></span
        >

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

        <divider label="OR"></divider>

        <!-- Register via email + password -->
        <form class="w-full" @submit.prevent="localLogin">
          <!-- Email -->
          <input-field
            :type="formData.email.type"
            :name="formData.email.name"
            :label="formData.email.label"
            :placeholder="formData.email.placeholder"
            v-model="formData.email.value"
            :isRequired="formData.email.isRequired"
            :error="formData.email.error"
            @change="validateEmail"
          ></input-field>

          <!-- Password -->
          <input-field
            :type="formData.password.type"
            :name="formData.password.name"
            :label="formData.password.label"
            :placeholder="formData.password.placeholder"
            v-model="formData.password.value"
            :isRequired="formData.password.isRequired"
            :error="formData.password.error"
            @change="validatePassword"
          ></input-field>

          <!-- Submit button -->
          <primary-button class="w-full" type="submit">
            <div class="w-full flex items-center justify-center">
              <span> Login </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </primary-button>

          <!-- Show error message if login fails -->
          <div
            v-if="$store.state.auth.error.area === 'login'"
            class="text-red-500"
          >
            {{ $store.state.auth.error.message }}
          </div>
        </form>

        <!-- Forgot password link -->
        <span class="w-full flex justify-between mt-3">
          <router-link to="/forgotpassword">
            <span class="text-blue-700 underline">Forgot your password?</span>
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
  import InputField from './../../components/Form/Input.vue';
  import PrimaryButton from './../../components/Buttons/PrimaryButton.vue';
  import Divider from './../../components/Widgets/Divider.vue';

  export default {
    //===========================
    // DATA
    //===========================
    data() {
      return {
        formData: {
          email: {
            type: 'text',
            name: 'email',
            label: 'Your email',
            placeholder: 'bruce@wayne-enterprise.com',
            value: '',
            error: '',
            isRequired: true,
          },
          password: {
            type: 'password',
            name: 'passwprd',
            label: 'Your password (min. 10 chars)',
            placeholder: '',
            value: '',
            error: '',
            isRequired: true,
          },
        },
      };
    },
    //===========================
    // COMPONENTS
    //===========================
    components: {
      GuestLayout,
      TwitterAuthButton,
      GoogleAuthButton,
      Card,
      MainHeadline,
      InputField,
      PrimaryButton,
      Divider,
    },
    //===========================
    // METHODS
    //===========================
    methods: {
      /**
       * Log in via Google.
       */
      loginWithGoogle() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/google`;
      },
      /**
       * Log in via Twitter.
       */
      loginWithTwitter() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/twitter`;
      },
      /**
       * Log in via email and password.
       */
      async localLogin() {
        this._validateInputs();
        if (this.formData.email.error || this.formData.password.error) {
          return;
        }
        // Trigger action from auth store.
        this.$store.dispatch('login', {
          email: this.formData.email.value,
          password: this.formData.password.value,
        });
      },
      /**
       * Validate the form input fields.
       */
      _validateInputs() {
        this.validateEmail();
        this.validatePassword();
      },

      /**
       * Validate the email field
       */
      validateEmail() {
        const isEmail = String(this.formData.email.value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
        if (!isEmail) {
          return (this.formData.email.error =
            'Please enter a valid email address.');
        }

        return (this.formData.email.error = '');
      },
      /**
       * Validate the password field
       */
      validatePassword() {
        if (this.formData.password.value.length < 10) {
          return (this.formData.password.error =
            'Please provide a password with at least 10 characters.');
        }
        this.formData.password.error = '';
      },
    },
  };
</script>
