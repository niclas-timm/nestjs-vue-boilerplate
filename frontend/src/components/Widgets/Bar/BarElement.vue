<template>
    <div>
        <small-label v-if="label">{{ label }}</small-label>
        <div><slot></slot></div>
    </div>
</template>

<script>
import SmallLabel from "./../../Typography/SmallLabel.vue";
export default {
    components: {
        SmallLabel,
    },
    props: {
        label: String,
    },
};
</script>
