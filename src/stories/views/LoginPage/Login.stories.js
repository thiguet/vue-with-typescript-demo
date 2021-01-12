import Login from '@/views/Login.vue';
import './Login.stories.css';

export default {
    title: 'Example/Views/Login',
    component: Login,
};

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Login },
    template: '<Login @onclick="onclick" v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
    id: 'some-id',
    name: 'some-name',
    label: 'Login',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onclick: () => {},
};
