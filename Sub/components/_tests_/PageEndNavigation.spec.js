import { mount, createLocalVue } from '@vue/test-utils'
import get from 'lodash/get'
import PageEndNavigation from '~/components/PageEndNavigation.vue'

/*
  Spectrum object reference
  ##################################################################################################
  {
    Ui1: {
      Component: 'ContinueUi1',
      Labels: [
        'CONTINUE'
      ]
    },
    Ui2: {
      Component: 'ContinueUi2',
      Labels: [
        'CONTINUE SHOPPING',
        'ENTER NOW' || CHECKOUT NOW (if cartCount > 0) => POST
      ]
    },
    Ui3: {
      Component: 'ContinueUi3',
      Labels: [
        'CONTINUE' => POST
      ]
    }
  }
*/

const localVue = createLocalVue()
localVue.directive('ui', {})
localVue.directive('ripple', {})

const getSpectrumValue = propsValue => (n) => {
  return get(
    global,
    `Spectrum.UiComponentData.PageNavigation.${propsValue}.${n}`
  )
}

const componentFactory = (overrides = {}, overrideMocks = {}) => {
  return Object.assign(
    {
      propsData: {
        ui: null
      },
      localVue,
      stubs: ['EcomArrow'],
      mocks: {
        $hopX: {
          sleep: () => {},
          invertColor: () => {},
          getParentComponent: () => {}
        },
        $route: {
          query: {
            tn: 'As-seen-on-tv'
          }
        },
        $store: {
          dispatch: () => {},
          getters: Object.assign(
            {
              'app/getNextPathExperience': {
                Slug: 'some-other-tab'
              },
              'app/getPagePathExperienceBySlug': () => ({
                Ui: {
                  Colors: {
                    PageBackground: '#ffffff'
                  }
                }
              })
            },
            overrideMocks.getters
          )
        }
      }
    },
    overrides
  )
}

// describe('PageEndNavigation', () => {
//   let wrapper

//   beforeEach(() => {
//     wrapper = mount(PageEndNavigation, componentFactory())
//   })

//   test('ensure legal disclaimer is rendered', () => {
//     const legal = wrapper.find('p.legal')

//     expect(legal).toBeTruthy()
//     expect(legal.text()).toContain('NO PURCHASE OR FEE NECESSARY TO ENTER.')
//     expect(legal.text()).toContain(
//       'A PURCHASE WON’T IMPROVE AN INDIVIDUAL’S CHANCE OF WINNING.'
//     )
//   })

//   // test('matches snapshot', () => {
//   //   expect(wrapper.html()).toMatchSnapshot()
//   // })
// })

// describe('[Ui1] PageEndNavigation with 1 button', () => {
//   let wrapper
//   const propsValue = 'Ui1'
//   const spectrum = getSpectrumValue(propsValue)

//   beforeEach(() => {
//     wrapper = mount(
//       PageEndNavigation,
//       componentFactory({
//         propsData: {
//           ui: propsValue
//         }
//       })
//     )
//   })

//   test('btn1 is rendered and NOT wrapped in HTML <form> tag', () => {
//     const btn1 = wrapper.findComponent({ ref: 'button1' })
//     expect(btn1.html()).not.toContain('<form')
//   })

//   // test('btn1 calls advancePathExperience method when clicked', async () => {
//   //   const btn1 = wrapper.findComponent({ ref: 'button1' }).find('button')
//   //   jest.spyOn(wrapper.vm, 'advancePathExperience')

//   //   await btn1.trigger('click')

//   //   expect(wrapper.vm.advancePathExperience).toHaveBeenCalled()
//   //   expect(btn1.html()).toContain('disabled')
//   // })

//   test('ensure Button label is correct based on Spectrum config for first btn', () => {
//     const btn1Text = wrapper.findComponent({ ref: 'buttonText1' })
//     expect(btn1Text).toBeTruthy()
//     expect(btn1Text.text()).toMatch(spectrum('Labels[0]'))
//   })

//   // test('matches snapshot', () => {
//   //   expect(wrapper.html()).toMatchSnapshot()
//   // })
// })

// describe('[Ui2] PageEndNavigation with 2 buttons', () => {
//   let wrapper
//   const propsValue = 'Ui2'
//   const spectrum = getSpectrumValue(propsValue)

//   beforeEach(() => {
//     wrapper = mount(
//       PageEndNavigation,
//       componentFactory({
//         propsData: {
//           ui: propsValue
//         }
//       })
//     )
//   })

//   test('ensure Button label is correct based on Spectrum config for first btn', () => {
//     const btn1Text = wrapper.findComponent({ ref: 'buttonText1' })
//     expect(btn1Text).toBeTruthy()
//     expect(btn1Text.text()).toMatch(spectrum('Labels[0]'))
//   })

//   test('ensure Button label is correct based on Spectrum config for second btn', () => {
//     const btn2Text = wrapper.findComponent({ ref: 'buttonText2' })
//     expect(btn2Text).toBeTruthy()
//     expect(btn2Text.text()).toMatch(spectrum('Labels[1]'))
//   })

//   test('btn1 is rendered and NOT wrapped in HTML <form> tag', () => {
//     const btn1 = wrapper.findComponent({ ref: 'button1' })
//     expect(btn1.html()).not.toContain('<form')
//   })

//   // test('btn2 is rendered wrapped in HTML <form> tag', () => {
//   //   const btn2 = wrapper.findComponent({ ref: 'button2' })
//   //   expect(btn2.html()).toContain('<form')
//   // })

//   // test('matches snapshot', () => {
//   //   expect(wrapper.html()).toMatchSnapshot()
//   // })
// })

// describe('[Ui3] PageEndNavigation with 1 button which will POST', () => {
//   let wrapper
//   const propsValue = 'Ui3'
//   const spectrum = getSpectrumValue(propsValue)

//   beforeEach(() => {
//     wrapper = mount(
//       PageEndNavigation,
//       componentFactory(
//         {
//           propsData: {
//             ui: propsValue
//           }
//         },
//         {
//           getters: {
//             'app/getNextPathExperience': {}
//           }
//         }
//       )
//     )
//   })

//   test('ensure Button label is correct based on Spectrum config for first btn', () => {
//     const btn1Text = wrapper.findComponent({ ref: 'buttonText1' })
//     expect(btn1Text).toBeTruthy()
//     expect(btn1Text.text()).toMatch(spectrum('Labels[0]'))
//   })

//   // test('btn1 is rendered wrapped in HTML <form> tag', () => {
//   //   const btn1 = wrapper.findComponent({ ref: 'button1' })
//   //   expect(btn1.html()).toContain('<form')
//   // })

//   // test('matches snapshot', () => {
//   //   expect(wrapper.html()).toMatchSnapshot()
//   // })
// })
