import { shallowMount } from '@vue/test-utils';
import DNDImage from '@/components/DNDImage.vue';
import faker from 'faker';
import axios from 'axios';
import {
    DNDImageComponent,
    DNDImageData,
    DNDImageMethods,
} from '@/views/models.d';
import { DNDImageProps } from './models';

describe('DNDImage.vue', () => {
    let data: DNDImageData;
    let props: DNDImageProps;
    let methods: DNDImageMethods;

    const triggerEventFactory = async (
        eventName: string,
        opts: object = {},
    ) => {
        const { imgContainer } = build();

        const options = {
            ...opts,
            preventDefault: jest.fn(),
        };

        await imgContainer().trigger(eventName, options);

        return options;
    };

    const build = () => {
        const wrapper = shallowMount(DNDImage, {
            propsData: { ...props },
        });

        const DNDImageComp = () => {
            const DNDImageInstance = (wrapper.vm as unknown) as DNDImageComponent;

            jest.spyOn(DNDImageInstance, 'dragLeave');
            jest.spyOn(DNDImageInstance, 'dragOver');
            jest.spyOn(DNDImageInstance, 'drop');

            return DNDImageInstance;
        };

        return {
            wrapper,
            DNDImageComp,
            img: () => wrapper.find('#img'),
            imgContainer: () => wrapper.find('.img-container'),
            wrongFileHeader: () => wrapper.find('#wrong-file-header'),
            dropImageHeader: () => wrapper.find('#drop-image-header'),
        };
    };

    beforeEach(() => {
        props = {
            id: faker.random.uuid(),
            value: faker.image.image(),
            setValue: jest.fn(),
        };

        methods = {
            drop: jest.fn(),
            dragOver: jest.fn(),
            dragLeave: jest.fn(),
        };
    });

    it('renders component', async () => {
        props.id = 'someFixedId';
        props.value = 'someFixedValue';

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { img, imgContainer, dropImageHeader, wrongFileHeader } = build();

        expect(imgContainer().exists()).toBe(true);
        expect(dropImageHeader().exists()).toBe(true);

        expect(img().exists()).toBe(false);
        expect(wrongFileHeader().exists()).toBe(false);
    });

    it('display wrong answer based on component data.', async () => {
        const {
            wrapper,
            img,
            imgContainer,
            dropImageHeader,
            wrongFileHeader,
        } = build();

        data = {
            wrongFile: true,
            isDragging: false,
        };

        await wrapper.setData({ ...data });

        expect(imgContainer().exists()).toBe(true);
        expect(dropImageHeader().exists()).toBe(false);
        expect(img().exists()).toBe(false);
        expect(wrongFileHeader().exists()).toBe(true);
    });

    it('display image based on component data.', async () => {
        const {
            wrapper,
            img,
            imgContainer,
            dropImageHeader,
            wrongFileHeader,
        } = build();

        data = {
            imageSource: 'http://lorempixel.com/640/480/food',
            wrongFile: false,
            isDragging: false,
        };

        await wrapper.setData({ ...data });

        expect(imgContainer().exists()).toBe(true);
        expect(dropImageHeader().exists()).toBe(false);
        expect(img().exists()).toBe(true);
        expect(wrongFileHeader().exists()).toBe(false);
    });

    it('simulate a dragOver  event.', async () => {
        const { DNDImageComp } = build();

        const options = await triggerEventFactory('dragover');

        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().isDragging).toBe(true);
            expect(methods.dragOver).toBeCalled();
        });
    });

    it('simulate a dragLeave event.', async () => {
        const { DNDImageComp } = build();

        const options = await triggerEventFactory('dragleave');

        await setTimeout(() => {
            expect(options.preventDefault).toHaveBeenCalled();
            expect(DNDImageComp().isDragging).toBe(false);
            expect(methods.dragLeave).toBeCalled();
        });
    });

    it('simulate a drop event.', async () => {
        const { DNDImageComp } = build();

        const getBlob = (baseURL: string): Blob => {
            try {
                return new Blob([window.btoa(faker.lorem.words())], {
                    type: 'image/jpeg',
                });
            } catch (e) {
                console.error('Failed to create Blobl file.');
                throw new Error(e.stack);
            }
        };

        const getDataTransfer = () => {
            interface DataTranferMock {
                files: File[];
            }

            const dataTransfer: DataTranferMock = {
                files: [],
            };

            const blob: Blob = getBlob(faker.image.food());

            dataTransfer.files.push(new File([blob], faker.system.fileName()));

            return dataTransfer;
        };

        const dataTransfer = await getDataTransfer();

        const options = await triggerEventFactory('drop', {
            preventDefault: jest.fn(),
            dataTransfer,
        });

        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().drop).toBeCalledWith({
                dataTransfer,
            });
        });
    });
});
