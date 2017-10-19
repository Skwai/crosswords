import Vue from 'vue'
import Clue from '@/components/Clue'

const store = {
  getters: {
    uid: () => 'user1',
    isFocusedWord: () => false,
    stringToHSL: (opacity) => `hsla(100, 90%, 60%, ${opacity})`
  }
}

describe('Clue.vue', () => {
  it('should render a clue', () => {
    const vm = new Vue({ store, ...Clue }).$mount()
    expect(vm.$el instanceof Node).is.true
  })
})
