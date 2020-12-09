<template>
    <div id="app">
        <router-view />
        <Alert />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Alert from '@/components/Alert.vue';

export default Vue.extend({
    components: { Alert },
});
</script>
<style>
:root {
    --bg-color: blue;
    --border-color: gray;
    --font-family: 'Open Sans', sans-serif;
    --second-bg: green;
    --ternary-bg: #089630;
    --forth-bg: blue;
    --font-title-size: 20px;
    --font-input-size: 16px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
    font-family: var(--font-family);
    font-size: var(--font-title-size);
}

div {
    display: flex;
    width: 100%;
}

legend span.accessibility {
    position: absolute;
    left: -9999px;
    width: 100px;
    height: auto;
    overflow: hidden;
}

svg,
img {
    filter: brightness(55);
}
</style>
