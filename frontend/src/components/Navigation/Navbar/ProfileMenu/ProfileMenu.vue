<template>
  <div
    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
  >
    <div class="ml-3 relative">
      <profile-icon v-on:click-button="toggleMobileMenu"></profile-icon>

      <div
        v-if="showProfileMenu"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <div class="px-4 py-2">{{ $store.state.auth.user.name }}</div>

        <span
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2"
          @click="logout"
          >Log out</span
        >
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileIcon from './ProfileIcon.vue';
  export default {
    data() {
      return {
        showProfileMenu: false,
      };
    },
    props: ['src'],
    components: {
      ProfileIcon,
    },
    methods: {
      async logout() {
        window.localStorage.removeItem('access_token');
        this.$store.dispatch('logout');
      },
      toggleShowProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
      },
    },
  };
</script>
