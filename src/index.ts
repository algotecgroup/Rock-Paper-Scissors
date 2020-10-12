import { run } from '@cycle/run';
import { getDrivers } from './drivers';
import { Component } from './interfaces';
import { App } from './components/app';

const main: Component = App;

run(main as any, getDrivers());
