import Vue from 'vue'
import Clue from '@/components/Clue'

describe('Clue.vue', () => {
  it('should render a clue', () => {
    const vm = new Vue(Clue).$mount()
    expect(vm.$el instanceof Node).is.true
  })
})
