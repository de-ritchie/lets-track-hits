const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var analyticsSchema = new Schema({

    onDate: Date,
    visit: Number,
    hits: Number,
    uniqueVisits: Number,
    trafficSources: {
        directNavigation: Number,
        referralTraffic: Number,
        organicSearch: Number,
        ppc: Number
    }
});

var Analytics = mongoose.model('analytics', analyticsSchema, 'analytics');

module.exports = Analytics;