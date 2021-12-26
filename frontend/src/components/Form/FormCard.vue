<template>
    <div class="w-full max-w-lg">
        <div class="bg-white px-8 pt-6 pb-8 mb-4">
            <h2
                class="
                    text-2xl
                    font-bold
                    leading-7
                    text-gray-900
                    sm:text-3xl sm:truncate
                "
            >
                {{ title }}
            </h2>
        </div>
        <slot name="form"></slot>
    </div>
</template>

<script>
import SectionHeadline from "./../Typography/SectionHeadline.vue";
export default {
    components: {
        SectionHeadline,
    },
    props: {
        title: String,
    },
};
</script>
