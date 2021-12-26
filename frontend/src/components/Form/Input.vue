<template>
    <div class="form-element py-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="name">
            {{ label }} <span v-if="isRequired"> *</span>
        </label>
        <input
            class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
            "
            :id="name"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
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
    },
    emits: ["update:modelValue"],
};
</script>
