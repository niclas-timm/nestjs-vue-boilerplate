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
        <!-- <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div> -->
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
  import BurgerButton from './../Buttons/BurgerButton.vue';
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
      };
    },
    // ======================
    // Components
    // ======================
    components: {
      NavbarItem,
      MobileNavbarItem,
      BurgerButton,
    },
    // ======================
    // Methods
    // ======================
    methods: {
      toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu;
      },
    },
  };
</script>
