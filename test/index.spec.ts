import { Blinker } from '../src';

describe('index', () => {
  describe('Blinker', () => {
    it('should return blinking instance', () => {
      const blinker = new Blinker();
      expect(blinker.visible ? 'on' : 'off').toMatch('on');
      blinker.stop(); // close handler
    });
  });
});
