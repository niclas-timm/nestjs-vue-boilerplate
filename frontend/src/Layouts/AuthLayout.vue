<template>
  <base-layout :headline="headline">
    <template #header>
      <default-navbar></default-navbar>
    </template>

    <slot></slot>
  </base-layout>
</template>

<script>
  import DefaultNavbar from '../components/Navigation/DefaultNavbar.vue';
  import BaseLayout from './BaseLayout.vue';

  export default {
    props: ['headline'],
    components: { BaseLayout, DefaultNavbar },
  };
</script>
