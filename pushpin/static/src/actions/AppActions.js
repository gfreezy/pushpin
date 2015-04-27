/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  /**
   * @param {object} message New message
   * @param {object} room Room
   */
  newMessage(message, room) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.NEW_INCOMING_MESSAGE,
      message: message,
      room: room
    });
  },
  sendMessage(message, room) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SEND_MESSAGE,
      message: message,
      room: room
    });
  },
  enterRoom(room) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.ENTER_ROOM,
      room: room
    });
  },
  leaveRoom(room) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.LEAVE_ROOM,
      room: room
    });
  }
};
