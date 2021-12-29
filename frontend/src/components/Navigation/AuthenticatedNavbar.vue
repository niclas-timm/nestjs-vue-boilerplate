<template>
  <!-- Desktop Menu -->
  <nav class="bg-accent">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <burger-button @click="toggleMobileMenu"></burger-button>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Navbar items -->
              <navbar-item
                v-for="(item, i) in links"
                :key="i"
                :label="item.label"
                :destination="item.destination"
                :active="item.active"
              ></navbar-item>
            </div>
          </div>
        </div>

        <!-- Profile icon on the right side -->
        <profile-menu></profile-menu>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div :class="`sm:hidden overflow-hidden ${!showMobileMenu ? 'h-0' : ''}`">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Navbar items -->
        <mobile-navbar-item
          v-for="(item, i) in links"
          :key="i"
          :label="item.label"
          :destination="item.destination"
          :active="item.active"
        ></mobile-navbar-item>
      </div>
    </div>
  </nav>
</template>

<script>
  import MobileNavbarItem from './Navbar/MobileNavbarItem.vue';
  import NavbarItem from './Navbar/NavbarItem.vue';
  import BurgerButton from '../Buttons/BurgerButton.vue';
  import ProfileMenu from './Navbar/ProfileMenu/ProfileMenu.vue';

  export default {
    // ======================
    // DATA
    // ======================
    data() {
      return {
        links: [
          {
            label: 'Dashboard',
            destination: '/dashboard',
            active: this.$route.name === 'Dashboard',
          },
          {
            label: 'Community',
            destination: '/community',
            active: this.$route.name === 'Community',
          },
        ],
        showMobileMenu: false,
        showProfileMenu: false,
      };
    },
    // ======================
    // Components
    // ======================
    components: {
      NavbarItem,
      MobileNavbarItem,
      BurgerButton,
      ProfileMenu,
      ProfileMenu,
    },
    // ======================
    // Methods
    // ======================
    methods: {
      toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu;
      },
      toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
      },
      logout() {
        window.localStorage.removeItem('access_token');
        this.$store.dispatch('logout');
      },
    },
  };
</script>
