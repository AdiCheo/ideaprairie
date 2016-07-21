/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contests              ->  index
 * POST    /api/contests              ->  create
 * GET     /api/contests/:id          ->  show
 * PUT     /api/contests/:id          ->  update
 * DELETE  /api/contests/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Contest from './contest.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      return null;
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleUnauthorized(req, res) {
  return function(entity) {
    if (!entity) {return null;}
    if(entity.user._id.toString() !== req.user._id.toString()){
      res.send(403).end();
      return null;
    }
    return entity;
  }
}

// Gets a list of Contests
export function index(req, res) {
  return Contest.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Contest from the DB
export function show(req, res) {
  return Contest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Contest in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Contest.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Contest in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Contest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Contest from the DB
export function destroy(req, res) {
  return Contest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
