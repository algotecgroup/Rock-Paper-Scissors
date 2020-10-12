import { VNode } from '@cycle/dom';

import { spriteSvg } from './svg-sprite';

export function icon(filename: string, className = ''): VNode | null {
  return spriteSvg(filename, `.icon.icon-${filename}${className}`);
}
