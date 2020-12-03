import { mount, shallowMount, Wrapper } from '@vue/test-utils';

import Vue from 'vue';
import ProductsTable from '@/components/ProductsTable.vue';
import { ProductsTableProps } from './models';
import faker from 'faker';
import { Measures } from '@/store/datatypes/models';

describe('ProductsTable', () => {
    let props: ProductsTableProps;

    const getRandomMeasure = () =>
        faker.random.arrayElement(Object.values(Measures)) as Measures;

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
            rows: Array(20).fill({
                name: faker.random.word(),
                measure: getRandomMeasure(),
                qtd: faker.random.number(),
                minQtd: faker.random.number(),
                image: faker.image.image(),
            }),
        };
    });

    it('renders component', () => {
        props = {
            rows: [
                {
                    name: 'test',
                    measure: getRandomMeasure(),
                    qtd: 1,
                    minQtd: 1,
                    image: 'NO IMAGE :(',
                },
            ],
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
        await setTimeout(async () => {
            await editBtn().trigger('click');

            expect(mountedWrapper.emitted('on-edit')).toBeTruthy();
            expect((mountedWrapper.emitted('on-edit') || [])[0]).toBe(0);
        });
    });

    it('dispatch event when we click on the delete btn', async () => {
        const { mountedWrapper, deleteBtn } = build();

        // await v-for to render our component.
        await setTimeout(async () => {
            await deleteBtn().trigger('click');

            expect(mountedWrapper.emitted('on-delete')).toBeTruthy();
            expect((mountedWrapper.emitted('on-delete') || [])[0]).toBe(0);
        });
    });
});
