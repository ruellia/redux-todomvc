import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function findItemIndex(state, itemId) {
    return state
        .get('todos')
        .findIndex((item) => item.get('id') === itemId);
}

// We can refactor the toggleComplete function to use findItemIndex
function toggleComplete(state, itemId) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state
        .get('todos')
        .get(itemIndex)
        .update('status', status => status === 'active'
            ? 'completed'
            : 'active');

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function editItem(state, itemId) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state
        .get('todos')
        .get(itemIndex)
        .set('editing', true);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function cancelEditing(state, itemId) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state
        .get('todos')
        .get(itemIndex)
        .set('editing', false);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function doneEditing(state, itemId, newText) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state
        .get('todos')
        .get(itemIndex)
        .set('editing', false)
        .set('text', newText);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function changeFilter(state, filter) {
    return state.set('filter', filter);
}

function addItem(state, itemText) {
    const itemId = state
        .get('todos')
        .reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;
    const newItem = Map({id: itemId, text: itemText, status: 'active'});
    return state.update('todos', (todos) => todos.push(newItem));
}

export default function (state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'TOGGLE_COMPLETE':
            return toggleComplete(state, action.itemId);
        case 'CHANGE_FILTER':
            return changeFilter(state, action.filter);
        case 'EDIT_ITEM':
            return editItem(state, action.itemId);
        case 'CANCEL_EDITING':
            return cancelEditing(state, action.itemId);
        case 'DONE_EDITING':
            return doneEditing(state, action.itemId, action.newText);
        case 'ADD_ITEM':
            return addItem(state, action.itemText);
    }
    return state;
}