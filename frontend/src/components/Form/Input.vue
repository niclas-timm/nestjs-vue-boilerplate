<template>
  <div class="form-element py-2">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="name">
      {{ label }} <span v-if="isRequired"> *</span>
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'border-red-400': error }"
      :id="name"
      :type="type || text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="text-sm -mt-4 text-red-400">{{ error }}</div>
  </div>
</template>
<script>
  export default {
    props: {
      name: String,
      label: String,
      placeholder: String,
      modelValue: String,
      isRequired: Boolean,
      type: String,
      error: String,
    },
    emits: ['update:modelValue'],
  };
</script>
