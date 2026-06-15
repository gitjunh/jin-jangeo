import { describe, expect, it } from 'vitest';
import { calcScaledSize } from '@shared/media';

describe('calcScaledSize', () => {
  it('returns original size when within max width', () => {
    expect(calcScaledSize(800, 600, 1280)).toEqual({ width: 800, height: 600 });
  });

  it('scales down proportionally', () => {
    expect(calcScaledSize(4000, 3000, 1280)).toEqual({ width: 1280, height: 960 });
  });

  it('handles portrait images', () => {
    const result = calcScaledSize(3024, 4032, 1280);
    expect(result.width).toBe(960);
    expect(result.height).toBe(1280);
  });
});
