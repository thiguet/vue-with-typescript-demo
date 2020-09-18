<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
<style>
:root {
    --bg-color: blue;
    --border-color: gray;
    --font-family: 'Open Sans', sans-serif;
    --second-bg: green;
    --font-title-size: 20px;
    --font-input-size: 16px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
    font-family: var(--font-family);
    font-size: var(--font-title-size);
}

form {
    width: 100%;
}

div {
    display: flex;
}

legend span.accessibility {
    position: absolute;
    left: -9999px;
    width: 100px;
    height: auto;
    overflow: hidden;
}
</style>
