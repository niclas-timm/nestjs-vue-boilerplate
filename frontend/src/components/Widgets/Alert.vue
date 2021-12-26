<template>
    <div
        v-if="show"
        class="border-t rounded border-b px-4 py-3"
        :class="{
            'bg-success-background text-success-color': success,
            'bg-info-background text-info-color': info,
            'bg-danger-background text-danger-color': danger,
        }"
        role="alert"
    >
        <p class="font-bold">{{ largeText }}</p>
        <p class="text-sm">{{ smallText }}</p>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        largeText: String,
        smallText: String,
        success: Boolean,
        info: Boolean,
        danger: Boolean,
    },
};
</script>
