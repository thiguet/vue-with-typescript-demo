import Button from '@/components/Button.vue';
import './Button.stories.css';
import imageFile from './logo.gif';

export default {
    title: 'Example/Components/Button',
    component: Button,
};

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Button },
    template: '<Button @onclick="onclick" v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
    id: 'some-id',
    name: 'some-name',
    label: 'Button',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onclick: () => {},
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    id: 'some-id2',
    name: 'some-name2',
    label: 'Button With Icon',
    icon: imageFile,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onclick: () => {},
};
