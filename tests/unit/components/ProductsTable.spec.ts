import { mount, shallowMount, Wrapper } from '@vue/test-utils';

import ProductsTable from '@/components/ProductsTable.vue';
import Vue from 'vue';
import { ProductsTableProps } from './models';
import { getFakeProductArray } from '../utils/ProductFactory';

describe('ProductsTable', () => {
    let props: ProductsTableProps;

    const build = () => {
        const options = {
            propsData: props,
        };

        const wrapper: Wrapper<ProductsTable> = shallowMount(
            ProductsTable,
            options,
        );

        const mountedWrapper: Wrapper<ProductsTable> = mount(
            ProductsTable,
            options,
        );

        return {
            wrapper,
            mountedWrapper,
            table: () => mountedWrapper.find('#table'),
            rows: () => mountedWrapper.findAll('.row'),
            editBtn: () =>
                mountedWrapper
                    .findAll('.row')
                    .at(0)
                    .find('#edit-1'),
            deleteBtn: () =>
                mountedWrapper
                    .findAll('.row')
                    .at(0)
                    .find('#delete-1'),
        };
    };

    beforeEach(() => {
        props = {
            rows: getFakeProductArray(),
        };
    });

    it('renders component', () => {
        props = {
            rows: [],
        };
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { table, rows, editBtn, deleteBtn } = build();

        expect(table().exists()).toBe(true);
        expect(rows().exists()).toBe(true);
        expect(editBtn().exists()).toBe(true);
        expect(deleteBtn().exists()).toBe(true);
    });

    it('dispatch event when we click on the edit btn', async () => {
        const { mountedWrapper, editBtn } = build();

        // await v-for to render our component.

        await Vue.nextTick();

        await editBtn().trigger('click');

        expect(mountedWrapper.emitted('on-edit')).toBeTruthy();
        expect((mountedWrapper.emitted('on-edit') || [])[0]).toStrictEqual([0]);
    });

    it('dispatch event when we click on the delete btn', async () => {
        const { mountedWrapper, deleteBtn } = build();

        // await v-for to render our component.

        await Vue.nextTick();

        await deleteBtn().trigger('click');

        expect(mountedWrapper.emitted('on-delete')).toBeTruthy();
        expect((mountedWrapper.emitted('on-delete') || [])[0]).toStrictEqual([
            0,
        ]);
    });

    it('dispatch event when we click on the edit btn', async () => {
        const { mountedWrapper, editBtn } = build();

        jest.spyOn(mountedWrapper.vm, '$emit');

        // await v-for to render our component.
        await Vue.nextTick();
        await editBtn().trigger('click');

        expect(mountedWrapper.vm.$emit).toBeCalledWith('on-edit', 0);
    });

    it('dispatch event when we click on the delete btn', async () => {
        const { mountedWrapper, deleteBtn } = build();

        jest.spyOn(mountedWrapper.vm, '$emit');

        // await v-for to render our component.
        await Vue.nextTick();
        await deleteBtn().trigger('click');

        expect(mountedWrapper.vm.$emit).toBeCalledWith('on-delete', 0);
    });
});
