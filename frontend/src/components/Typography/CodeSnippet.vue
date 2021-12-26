<template>
    <div class="overflow-hidden rounded-xl bg-fuchsia-400 max-w-prose">
        <pre
            class="
                scrollbar-none
                overflow-x-auto
                py-6
                text-sm
                leading-snug
                language-html
                text-white
                bg-black bg-opacity-75
            "
        ><code class="language-html">
            <slot></slot>
            </code></pre>
    </div>
</template>
