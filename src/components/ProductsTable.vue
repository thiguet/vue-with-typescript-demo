<template>
    <div class="table-container">
        <table id="table" width="100%">
            <tbody>
                <tr
                    class="row"
                    v-for="({ icon, name }, index) in rows"
                    :key="index"
                >
                    <td class="left">
                        <span><img :src="icon"/></span>
                    </td>
                    <td>
                        <span>{{ name }}</span>
                    </td>
                    <td class="right">
                        <div>
                            <Button
                                :id="`edit-${index + 1}`"
                                class="edit"
                                icon="./assets/icons/edit.svg"
                                name="editar"
                                label="Edit"
                                :onclick="evt => onEdit(evt, index)"
                            />
                            <Button
                                :id="`delete-${index + 1}`"
                                class="delete"
                                icon="./assets/icons/delete.svg"
                                name="deletar"
                                label="Delete"
                                :onclick="evt => onDelete(evt, index)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { ProductsTableComp } from '@/components/models.d';

import Component from 'vue-class-component';

import Button from '@/components/Button.vue';
import { Prop } from 'vue-property-decorator';

interface RowsData {
    icon: string;
    name: string;
}

@Component({
    name: 'ProductsTable',
    components: {
        Button,
    },
})
export default class ProductsTable extends Vue implements ProductsTableComp {
    @Prop({ required: true }) private rows!: Array<RowsData>;

    public onEdit(evt: Event, index: number) {
        return this.$emit('on-edit', index);
    }

    public onDelete(evt: Event, index: number) {
        return this.$emit('on-delete', index);
    }
}
</script>

<style>
#table {
    margin: auto;
    width: 100%;
}

#table > tbody > tr > td > span > img {
    width: 60px;
    filter: brightness(0);
}

.left {
    text-align: 'left';
    margin-left: 1em;
}
.right {
    text-align: 'right';
    margin-right: 1em;
}

.edit {
    justify-content: flex-end !important;
}

.edit > button,
.delete > button {
    background: none;
}

.icon {
    width: 40px;
}
</style>
