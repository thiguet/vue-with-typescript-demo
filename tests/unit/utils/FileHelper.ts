import faker from 'faker';
import { ImageMimeTypes } from '../components/models';

interface DataTranferMock {
    files: File[];
}

interface EventFileOptions {
    preventDefault: Function;
    dataTransfer: DataTranferMock;
}

interface FakeFile {
    name: string;
    type: string;
    file: File;
}

const getFakeFile = (type: string): FakeFile => {
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

export const getRandomImageMimeType = (): ImageMimeTypes =>
    faker.random.arrayElement(Object.values(ImageMimeTypes));

export const getImageFakeFile = (): File =>
    getFakeFile(getRandomImageMimeType()).file;

export const getOptionsWithFile = (): EventFileOptions => {
    const imageMimeType = getRandomImageMimeType();
    const { file } = getFakeFile(imageMimeType);

    const dataTransfer: DataTranferMock = {
        files: [file],
    };
    return {
        preventDefault: jest.fn(),
        dataTransfer,
    };
};

export const readFileAsync = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};
