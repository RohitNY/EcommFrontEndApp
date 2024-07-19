import { shallowMount } from '@vue/test-utils'
import Logo from '~/components/Logo.vue'

describe('Logo', () => {
  const wrapper = shallowMount(Logo)

  test('is a Vue instance', () => {
    expect(wrapper.findComponent(Logo)).toBeTruthy()
  })

  // test('matches snapshot', () => {
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
