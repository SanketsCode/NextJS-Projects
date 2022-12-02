'use strict';

/**
 * myevents service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::myevents.myevents');
