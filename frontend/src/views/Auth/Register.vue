<template>
  <guest-layout :headline="Register">
    <div class="w-full h-full flex items-center justify-center">
      <card class="w-6/12 h-6/12" center="true">
        <span class="mb-4">
          <main-headline label="Register" class="mb-2"></main-headline>
        </span>

        <span class="mb-6"
          >Already have an account?
          <router-link to="/login">
            <span class="text-blue-700 underline">Log in</span>
          </router-link></span
        >

        <!-- OAUTH -->
        <google-auth-button
          label="Register with Google"
          class="w-full mb-4"
          @click="registerWithGoogle"
        >
        </google-auth-button>
        <twitter-auth-button
          label="Register with Twitter"
          class="w-full"
          @click="registerWithTwitter"
        ></twitter-auth-button>

        <!-- Divide oAuth and local auth -->
        <divider label="OR"></divider>

        <!-- Register via email + password -->
        <form class="w-full" @submit.prevent="localRegister">
          <!-- Name -->
          <input-field
            :type="formData.name.type"
            :name="formData.name.name"
            :label="formData.name.label"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            :isRequired="formData.name.isRequired"
            :error="formData.name.error"
            @change="validateName"
          ></input-field>

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
              <span> Register </span>

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

          <!-- Show error message if registration fails -->
          <div
            v-if="$store.state.auth.error.area === 'register'"
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
  import Card from '../../components/Widgets/Card.vue';
  import MainHeadline from '../../components/Typography/MainHeadline.vue';
  import InputField from './../../components/Form/Input.vue';
  import PrimaryButton from './../../components/Buttons/PrimaryButton.vue';
  import Divider from './../../components/Widgets/Divider.vue';
  import TwitterAuthButton from '../../components/Buttons/Socials/TwitterAuthButton.vue';

  export default {
    data() {
      return {
        formData: {
          name: {
            type: 'text',
            name: 'name',
            label: 'Your name',
            placeholder: 'Bruce Wayne',
            value: '',
            error: '',
            isRequired: true,
          },
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
    components: {
      GuestLayout,
      GoogleAuthButton,
      Card,
      MainHeadline,
      InputField,
      PrimaryButton,
      Divider,
      TwitterAuthButton,
    },
    methods: {
      registerWithGoogle() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/google`;
      },
      registerWithTwitter() {
        window.location = `${process.env.VUE_APP_API_URL}/auth/twitter`;
      },
      async localRegister() {
        this._validateInputs();
        if (
          this.formData.email.error ||
          this.formData.name.error ||
          this.formData.password.error
        ) {
          return;
        }
        try {
          const res = await this.$store.dispatch('register', {
            name: this.formData.name.value,
            email: this.formData.email.value,
            password: this.formData.password.value,
          });
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * Validate the form input fields.
       */
      _validateInputs() {
        this.validateName();
        this.validateEmail();
        this.validatePassword();
      },
      /**
       * Validate the name field
       */
      validateName() {
        if (this.formData.name.value.length < 3) {
          return (this.formData.name.error =
            'Please provide a name with at least 2 characters.');
        }
        this.formData.name.error = '';
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
