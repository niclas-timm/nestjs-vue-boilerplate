<template>
  <div>
    <button
      type="button"
      class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      @click="$emit('click-button')"
    >
      <span class="sr-only">Open user menu</span>
      <img class="h-8 w-8 rounded-full" :src="$store.state.auth.user.avatar" />
    </button>
  </div>
</template>

<script>
  export default {};
</script>
