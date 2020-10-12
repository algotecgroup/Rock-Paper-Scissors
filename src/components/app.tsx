import xs, { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { extractSinks } from 'cyclejs-utils';
import isolate from '@cycle/isolate';

import { driverNames } from '../drivers';
import { Sources, Sinks, Component } from '../interfaces';

export function App(sources: Sources): Sinks {
  return {
    DOM: xs.never()
  };
}
