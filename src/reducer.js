import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function toggleComplete(state, itemId) {
    // We find the index associated with the itemId
    const itemIndex = state
        .get('todos')
        .findIndex((item) => item.get('id') === itemId);
    // We update the todo at this index
    const updatedItem = state
        .get('todos')
        .get(itemIndex)
        .update('status', status => status === 'active'
            ? 'completed'
            : 'active');

    // We update the state to account for the modified todo
    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function changeFilter(state, filter) {
  return state.set('filter', filter);
}

export default function (state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'TOGGLE_COMPLETE':
            return toggleComplete(state, action.itemId);
        case 'CHANGE_FILTER':
            return changeFilter(state, action.filter);
    }
    return state;
}