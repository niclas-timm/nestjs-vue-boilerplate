<template>
    <span
        class="
            text-xs
            font-semibold
            inline-block
            py-1
            px-2
            uppercase
            rounded-full
            last:mr-0
            mr-1
        "
        :class="{
            'bg-success-background text-success-color': success,
            'bg-info-background text-info-color': info,
            'bg-danger-background text-danger-color': danger,
        }"
    >
        {{ label }}
    </span>
</template>
<script>
export default {
    props: {
        label: String,
        success: Boolean,
        info: Boolean,
        danger: Boolean,
    },
};
</script>
