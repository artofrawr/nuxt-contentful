import HeroModule from './HeroModule.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'PageModules/HeroModule',
  component: HeroModule,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    bg: {
      control: { type: 'select' },
      options: ['bg-red-200', 'bg-blue-200', 'bg-yellow-200'],
    },
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HeroModule },
  template: '<hero-module v-bind="$props" />',
})

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  title: 'The default Hero Title',
}
