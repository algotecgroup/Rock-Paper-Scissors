import { makeDOMDriver } from '@cycle/dom';
import xs, { MemoryStream } from 'xstream';

import { Component } from './interfaces';

function resizeDriver(): MemoryStream<number> {
  let handler: () => void;

  return xs
    .createWithMemory({
      start(listener) {
        handler = () => {
          listener.next(window.innerWidth);
        };

        window.addEventListener('resize', handler);
      },
      stop() {
        window.removeEventListener('resize', handler);
      }
    });
}

const driversFactories: any = {
  DOM: () => makeDOMDriver('#app'),
  resize: () => resizeDriver
};

export function getDrivers(): any {
  return Object.keys(driversFactories)
    .map(k => ({ [k]: driversFactories[k]() }))
    .reduce((a, c) => ({ ...a, ...c }), {});
}

export const driverNames = Object.keys(driversFactories);
