/**
 * Idea model events
 */

'use strict';

import {EventEmitter} from 'events';
import Idea from './idea.model';
var IdeaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IdeaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Idea.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    IdeaEvents.emit(event + ':' + doc._id, doc);
    IdeaEvents.emit(event, doc);
  }
}

export default IdeaEvents;
