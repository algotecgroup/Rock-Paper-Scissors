import xs, { Stream } from 'xstream';
import { VNode, DOMSource, button, div, h2, main, span } from '@cycle/dom';
import { extractSinks } from 'cyclejs-utils';

import { spriteSvg } from '../svg-sprite';
import { Sources, Sinks, Component } from '../interfaces';

type View = 'landing' | 'game';
type Choice = 'rock' | 'paper' | 'scissors';

export function App(sources: Sources): Sinks {

  const {
    DOM,
    resize
  } = sources;

  // Intent
  const rockClick$ = DOM
    .select('.rock')
    .events('click');

  const paperClick$ = DOM
    .select('.paper')
    .events('click');

  const scissorsClick$ = DOM
    .select('.scissors')
    .events('click');

  // Model
  const view$: Stream<View> = xs
    .merge(
      rockClick$,
      paperClick$,
      scissorsClick$
    )
    .map((): View => 'game')
    .startWith('landing' as 'landing');

  const choice$: Stream<Choice> = xs
    .merge(
      rockClick$.mapTo('rock' as 'rock'),
      paperClick$.mapTo('paper' as 'paper'),
      scissorsClick$.mapTo('scissors' as 'scissors')
    )
    .startWith('rock');

  // View
  const vnode$ = xs
    .combine(
      view$,
      choice$
    )
    .map(([ view, choice ]) => (
      view === 'landing' ? (
        main('.landing', [
          div('.card', [
            h2('Choose:'),
            div('.buttons', [
              button('.rock', {
                props: {
                  title: 'Rock'
                }
              }, [
                spriteSvg('rock'),
                span('.sr-only', 'Rock')
              ]),
              button('.paper', {
                props: {
                  title: 'Paper'
                }
              }, [
                spriteSvg('paper'),
                span('.sr-only', 'Paper')
              ]),
              button('.scissors', {
                props: {
                  title: 'Scissors'
                }
              }, [
                spriteSvg('scissors'),
                span('.sr-only', 'Scissors')
              ])
            ])
          ])
        ])
      ) : (
        main('.game', [
          h2(choice)
        ])
      )
    ));

  resize
    .addListener({
      next: console.log
    });

  return {
    DOM: vnode$
  };

}
