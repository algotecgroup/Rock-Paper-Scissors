import { VNode, svg } from '@cycle/dom';

const SVGS: { [filename: string]: any } = {};

const modules = require
  .context('!svg-sprite-loader!assets', false, /\.svg$/);

modules
  .keys()
  .forEach((key) => { SVGS[key] = modules(key).default; });

export function spriteSvg(filename: string, className = ''): VNode | null {

  if (SVGS[`./${filename}.svg`] === undefined) {
    return null;
  }

  const {
    id,
    viewBox
  } = SVGS[`./${filename}.svg`];

  return (
    svg(className, {
      attrs: {
        viewBox
      }
    }, [
      svg.use({
        attrs: {
          href: `#${id}`
        }
      })
    ])
  );
}
