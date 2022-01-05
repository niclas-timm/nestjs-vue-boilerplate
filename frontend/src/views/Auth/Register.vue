<template>
  <guest-layout :headline="Login">
    <div class="w-full h-full flex items-center justify-center">
      <card class="w-6/12 h-6/12" center="true">
        <span class="mb-12">
          <main-headline label="Register" class="mb-12"></main-headline>
        </span>

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
          ></input-field>

          <!-- Submit button -->
          <primary-button type="submit">Register</primary-button>
        </form>

        <span class="w-full flex justify-between mt-3">
          <router-link to="/login">
            <span class="text-xs text-blue-700 underline"
              >Already have an account?</span
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
            error: 'Some error',
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
      localRegister() {
        console.log(this.formData);
      },
    },
  };
</script>
