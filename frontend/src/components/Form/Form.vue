<template>
    <div class="w-full max-w-lg">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2
                class="
                    text-2xl
                    font-bold
                    leading-7
                    text-gray-900
                    sm:text-3xl sm:truncate
                "
            >
                <slot name="title"></slot>
            </h2>
            <slot></slot>
            <div class="flex items-center justify-between">
                <slot name="submitarea"></slot>
            </div>
        </form>
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
