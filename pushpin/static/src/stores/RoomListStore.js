import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import {List, Map} from 'immutable';


class Room {
	constructor(id, members) {
		this.id = id;
		this.members = members;
	}
}


var CHANGE_EVENT = 'change';
var rooms = new List();

var RoomListStore = assign({}, EventEmitter.prototype, {

	newIncomingMessage(message, room) {
		rooms.get();
	},

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off(callback) {
    this.off(CHANGE_EVENT, callback);
  }

});


RoomListStore.dispatcherToken = Dispatcher.register((action) => {
  switch (action.actionType) {

    case ActionTypes.NEW_INCOMING_MESSAGE:
			RoomListStore.newIncomingMessage(action.message, action.room);
      break;

    case ActionTypes.ENTER_ROOM:
			RoomListStore.enterRoom(action.room);
      break;

    case ActionTypes.LEAVE_ROOM:
			RoomListStore.leaveRoom(action.room);
      break;

    default:
      // Do nothing

  }

});

export default RoomListStore;
