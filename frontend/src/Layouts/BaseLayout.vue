<template>
  <div>
    <!-- Header -->
    <div>
      <slot name="header"></slot>
    </div>

    <!-- Main -->
    <div
      class="content--container px-8 mx-auto mt-4 leading-6 w-full lg:max-w-5xl lg:px-16"
    >
      <main-headline :label="headline"></main-headline>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import MainHeadline from './../components/Typography/MainHeadline.vue';
  export default {
    components: {
      MainHeadline,
    },
    props: ['headline'],
  };
</script>
