import TextInput from '@/components/TextInput.vue';
import './TextInput.stories.css';

export default {
    title: 'Example/Components/TextInput',
    component: TextInput,
};

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextInput },
    template: '<text-input v-bind="$props"/>',
});

let value = 'someVal';

const setValue = (val) => {
    value = val;
};

export const Default = Template.bind({});
Default.args = {
    id: 'some-id',
    value,
    setValue,
};
