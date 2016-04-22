import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserList from '../components/user_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  // Subscribe to user data!
  if (Meteor.subscribe('userList.allUsersExcept', null).ready()) {
    const options = {
      sort: {username: 1}
    };

    const users = Collections.Users.find({}, options).fetch();
    onData(null, {users});
  } else {
    onData(); // Loading in case of empty
    // onData(null, {}); //
  }

  // Container disposal, unsubscribe here?
  return () => {null}
};

export const depsMapper = (context, actions) => {
  return {
    context: () => context
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
