<template>
  <modal-base :show="show">
    <div class="p-4">
      <div class="mb-4">
        <section-headline>
          {{ sectionHeadline }}
        </section-headline>
      </div>

      <paragraph>
        {{ subTitle }}
      </paragraph>

      <div class="flex justify-center items-center">
        <primary-button
          :loading="loading"
          @click="$emit('confirmationAction')"
          >{{ confirmationButtonLabel }}</primary-button
        >
        <div class="ml-4 cursor-pointer" @click="$emit('cancelAction')">
          Cancel
        </div>
      </div>
    </div>
  </modal-base>
</template>

<script>
  import ModalBase from './ModalBase.vue';
  import SectionHeadline from './../Typography/SectionHeadline.vue';
  import Paragraph from './../Typography/Paragraph.vue';
  import JetButton from './../../Jetstream/Button.vue';
  import PrimaryButton from './../Buttons/PrimaryButton.vue';

  export default {
    components: {
      JetModal,
      Paragraph,
      SectionHeadline,
      JetButton,
      PrimaryButton,
      ModalBase,
    },
    emits: ['confirmationAction', 'cancelAction'],
    props: {
      sectionHeadline: String,
      subTitle: String,
      confirmationButtonLabel: String,
      show: Boolean,
      loading: Boolean,
    },
  };
</script>
