import { mount } from '@vue/test-utils';
import DNDImage from '@/components/DNDImage.vue';
import faker from 'faker';
import { DNDImageComponent, DNDImageData } from '@/views/models.d';
import { DNDImageProps, ImageMimeTypes } from './models';

describe('DNDImage.vue', () => {
    let data: DNDImageData;
    let props: DNDImageProps;

    const getFakeFile = (type: string) => {
        const name = faker.system.fileName();
        const file = new File(['(⌐□_□)'], name, {
            type,
        });

        return {
            name,
            type,
            file,
        };
    };

    const build = () => {
        const wrapper = mount(DNDImage, {
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
        };
    };

    beforeEach(() => {
        props = {
            id: faker.random.uuid(),
            value: faker.image.image(),
            setValue: jest.fn(),
        };
    });

    it('renders component', async () => {
        props.id = 'someFixedId';
        props.value = 'someFixedValue';

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { img, imgContainer, wrongFileHeader } = build();

        expect(imgContainer().exists()).toBe(true);
        expect(img().exists()).toBe(true);
        expect(wrongFileHeader().exists()).toBe(false);
    });

    it('display wrong answer based on component data.', async () => {
        const { wrapper, img, imgContainer, wrongFileHeader } = build();

        data = {
            wrongFile: true,
            isDragging: false,
        };

        await wrapper.setData({ ...data });

        expect(imgContainer().exists()).toBe(true);
        expect(img().exists()).toBe(true);
        expect(wrongFileHeader().exists()).toBe(true);
    });

    it('display image based on component data.', async () => {
        const { wrapper, img, imgContainer, wrongFileHeader } = build();

        data = {
            imageSource: 'http://lorempixel.com/640/480/food',
            wrongFile: false,
            isDragging: false,
        };

        await wrapper.setData({ ...data });

        expect(imgContainer().exists()).toBe(true);
        expect(img().exists()).toBe(true);
        expect(wrongFileHeader().exists()).toBe(false);
    });

    it('simulate a dragOver event.', async () => {
        const { DNDImageComp, imgContainer } = build();

        const options = { preventDefault: jest.fn() };
        const event = new Event('dragover');
        Object.assign(event, options);
        await imgContainer().element.dispatchEvent(event);

        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().isDragging).toBe(true);
        }, 0);
    });

    it('simulate a dragLeave event.', async done => {
        const { DNDImageComp, imgContainer } = build();

        const event = new Event('dragleave');

        const options = {
            preventDefault: jest.fn(),
        };

        Object.assign(event, options);

        await imgContainer().element.dispatchEvent(event);

        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().isDragging).toBe(false);
            done();
        }, 0);
    });

    it('simulate a drop event with an image.', async done => {
        const imageMimeType = faker.random.arrayElement(
            Object.values(ImageMimeTypes),
        );
        const { file } = getFakeFile(imageMimeType);
        const { DNDImageComp, imgContainer, wrapper } = build();
        interface DataTranferMock {
            files: File[];
        }
        const dataTransfer: DataTranferMock = {
            files: [file],
        };
        const options = {
            preventDefault: jest.fn(),
            dataTransfer,
        };

        const event = new Event('drop');

        Object.assign(event, options);

        imgContainer().element.dispatchEvent(event);

        // Haven't found a way of waiting DOM to trigger my event.
        // Even using setTimeout or wrapper.vm.nextTick several times, hasn't played out.
        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().imageSource).toBeTruthy();
            expect(wrapper.emitted('change')).toBeTruthy();
            done();
        }, 1000);
    });

    it('simulate a drop event without a file.', async done => {
        const { DNDImageComp, imgContainer } = build();

        const options = {
            preventDefault: jest.fn(),
            dataTransfer: { files: [] },
        };

        const { imageSource, wrongFile, isDragging } = DNDImageComp();
        const event = new Event('drop');

        Object.assign(event, options);

        imgContainer().element.dispatchEvent(event);

        // Haven't found a way of waiting DOM to trigger my event.
        // Even using setTimeout or wrapper.vm.nextTick several times, hasn't played out.
        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            // Expecting them to be the same as before.
            expect(DNDImageComp().imageSource).toBe(imageSource);
            expect(DNDImageComp().wrongFile).toBe(wrongFile);
            expect(DNDImageComp().isDragging).toBe(isDragging);
            done();
        }, 1000);
    });

    it('simulate a drop event with a file that is not an image.', async done => {
        const notAnImageMimeType = 'application/pdf';
        const { file } = getFakeFile(notAnImageMimeType);
        const { DNDImageComp, imgContainer } = build();
        interface DataTranferMock {
            files: File[];
        }
        const dataTransfer: DataTranferMock = {
            files: [file],
        };
        const options = {
            preventDefault: jest.fn(),
            dataTransfer,
        };

        const event = new Event('drop');

        Object.assign(event, options);

        imgContainer().element.dispatchEvent(event);

        // Haven't found a way of waiting DOM to trigger my event.
        // Even using setTimeout or wrapper.vm.nextTick several times, hasn't played out.
        await setTimeout(() => {
            expect(options.preventDefault).toBeCalled();
            expect(DNDImageComp().imageSource).toBe(null);
            expect(DNDImageComp().wrongFile).toBe(true);
            expect(DNDImageComp().isDragging).toBe(false);
            done();
        }, 1000);
    });
});
