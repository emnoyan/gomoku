import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GameList from '../components/game_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  // Subscribe to user data!
  if (Meteor.subscribe('games.allGameSummaries').ready()) {
    const query = {};
    const options = {
      sort: {startDate: 1}
    };
    const games = Collections.Games.find(query, options).fetch();

    // Loads data into the contained components 'props'
    onData(null, {games});
  } else {
    // onData(); // Loading
    onData();
  }

  // Return a container disposal function
  return () => {};
};

export const depsMapper = (context, actions) => {
  return {
    context: () => context
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GameList);
