import * as shopX from '~/helpers/utility'

describe('EventEmitter', () => {
  test('Event $emit will return a promise containing {id, payload}', async () => {
    const emit = shopX.Event.$emit

    const res = await emit('Analytics', {
      event: 'on_tab_item_visible'
    })

    expect(res).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        payload: expect.any(Object)
      })
    )
  })
})
