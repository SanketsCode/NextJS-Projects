'use strict';

/**
 * myevents controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::myevents.myevents',{
    count(ctx) {
        var { query } = ctx.request
        return strapi.query('api::myevents.myevents').count({ where: query });
    }
    
});



