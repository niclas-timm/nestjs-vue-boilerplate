<template>
    <div class="form-element py-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="name">
            {{ label }} <span v-if="isRequired"> *</span>
        </label>
        <select
            :name="name"
            :id="name"
            class="w-full border bg-white rounded px-3 py-2 outline-none"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
            <option
                v-for="(option, i) in options"
                :key="i"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        name: String,
        label: String,
        isRequired: Boolean,
        options: Array,
    },
    emits: ["update:modelValue"],
};
</script>
