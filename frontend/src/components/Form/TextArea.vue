<template>
    <div class="form-element py-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="name">
            {{ label }} <span v-if="isRequired"> *</span></label
        >
        <textarea
            :name="name"
            :id="name"
            class="
                w-full
                px-3
                py-2
                text-gray-700
                border
                rounded-lg
                focus:outline-none
            "
            rows="5"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        name: String,
        label: String,
        placeholder: String,
        isRequired: Boolean,
    },
    emits: ["update:modelValue"],
};
</script>
