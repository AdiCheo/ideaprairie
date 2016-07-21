/**
 * Contest model events
 */

'use strict';

import {EventEmitter} from 'events';
import Contest from './contest.model';
var ContestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contest.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContestEvents.emit(event + ':' + doc._id, doc);
    ContestEvents.emit(event, doc);
  }
}

export default ContestEvents;
