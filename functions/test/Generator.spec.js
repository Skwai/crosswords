import { expect } from 'chai'

import Generator from '../lib/Generator'

describe('Generator', () => {
  describe('#constructor()', () => {
    it('sets class properties', () => {
      const size = 5
      const words = ['DANK']
      const gen = new Generator(size, words)
      expect(gen.size).to.equal(size)
      expect(gen.words).to.equal(words)
    })
  })
})
