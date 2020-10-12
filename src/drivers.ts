import { makeDOMDriver } from '@cycle/dom';
import switchPath from 'switch-path';

import { Component } from './interfaces';

const driversFactories: any = {
  DOM: () => makeDOMDriver('#app')
};

export function getDrivers(): any {
  return Object.keys(driversFactories)
    .map(k => ({ [k]: driversFactories[k]() }))
    .reduce((a, c) => ({ ...a, ...c }), {});
}

export const driverNames = Object.keys(driversFactories)
  .filter(name => name !== 'history')
  .concat(['state', 'router']);
