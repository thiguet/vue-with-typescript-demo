<template>
    <div class="wrapper">
        <div class="other-apps-login">
            <div class="app-login">
                <a id="facebook" :href="`${baseURL}/auth/facebook`"
                    ><img src="/assets/icons/facebook.svg" alt="facebook icon"
                /></a>
            </div>
            <div class="app-login">
                <a id="github" :href="`${baseURL}/auth/github`"
                    ><img src="/assets/icons/github.svg" alt="github icon"
                /></a>
            </div>
            <div class="app-login">
                <a id="google" :href="`${baseURL}/auth/google`"
                    ><img src="/assets/icons/google.svg" alt="google icon"
                /></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { LoginView } from '@/views/models.d';

import { baseURL } from '@/services/config.json';

@Component
export default class Login extends Vue implements LoginView {
    public readonly baseURL = baseURL;
}
</script>

<style scoped>
.other-apps-login {
    margin-top: 60px;
}

.app-login {
    justify-content: center;
}

.app-login img {
    filter: none;
    width: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.app-login img:hover {
    transform: scale(1.5);
}

.wrapper {
    height: 100vh;
    align-items: center;
}

a {
    align-self: center;
}
</style>
