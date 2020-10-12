import { Stream } from 'xstream';
import { MainDOMSource, VNode } from '@cycle/dom';

export type Component = (s: Sources) => Sinks;

export interface Sources {
  DOM: MainDOMSource;
  resize: Stream<number>;
}

export interface Sinks {
  DOM?: Stream<VNode>;
}
