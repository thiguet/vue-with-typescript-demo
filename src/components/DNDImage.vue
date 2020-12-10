<template>
    <div
        class="drop img-container"
        :class="getClasses"
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
    >
        <img
            id="img"
            :class="{ fallback: !imageSource }"
            :src="imageSource ? imageSource : fallbackImage"
        />
        <h1 id="wrong-file-header" v-if="wrongFile">Arquivo inválido!</h1>
    </div>
</template>

<script lang="ts">
import { DNDImageComponent } from '@/views/models.d';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'DNDImage',
})
export default class DNDImage extends Vue implements DNDImageComponent {
    isDragging: boolean;

    wrongFile: boolean;

    imageSource?: ArrayBuffer | string | null;

    fallbackImage: string;

    constructor() {
        super();
        this.isDragging = false;
        this.wrongFile = false;
        this.imageSource = null;
        this.fallbackImage = '/assets/icons/upload-image.svg';
    }

    get getClasses() {
        return { isDragging: this.isDragging };
    }

    dragOver() {
        this.isDragging = true;
    }

    dragLeave() {
        this.isDragging = false;
    }

    drop(event: { dataTransfer: DataTransfer }) {
        const { files } = event.dataTransfer;

        this.wrongFile = false;

        if (files.length === 1) {
            const file = files[0];

            if (file.type.indexOf('image/') >= 0) {
                const reader = new FileReader();
                reader.onload = (ev: ProgressEvent<FileReader>) => {
                    const fileReaderObj = ev.target as FileReader;
                    this.imageSource = fileReaderObj.result;
                    this.isDragging = false;
                };
                reader.readAsDataURL(file);
            } else {
                this.wrongFile = true;
                this.imageSource = null;
                this.isDragging = false;
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 14px;
}

.drop {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 10px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 2px;
    transition: background-color 0.2s ease-in-out;
    font-family: sans-serif;
}

.isDragging {
    background-color: #999;
    border-color: #fff;
}
img {
    max-height: 200px;
    border-radius: 50%;
}

img.fallback {
    width: 70%;
    border-radius: 0;
}

.img-container {
    display: flex;
    position: relative;
    width: 200px;
    height: 200px;
    padding: 10px;
    border-radius: 50%;
}

@media (max-width: 320px) {
    .img-container {
        width: 150px;
        height: 150px;
    }
}
</style>
