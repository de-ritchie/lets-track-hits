const express = require('express');
const router = express.Router();

const db = require('../model/db');
const Analytics = db.Analytics;



router.route('/')
    .get(function(req, res){

        var fromDate = req.query.fromDate;
        var toDate = req.query.toDate;
        console.log(fromDate, toDate, '-----');
        
        if(fromDate && toDate){
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            console.log(fromDate, toDate, '-----');
            Analytics.find({
                onDate: { $gte: fromDate, $lte: toDate }
            },function(err, data){
                if(err){
                    console.log(err);
                    return res.json({
                        title: 'Error Occurred'
                    });
                }
                res.json({
                    title: 'Search completed...',
                    data: data
                });
            });

        }else{
            Analytics.findOne({}, function(err, data) {
                if(err){

                    console.log(err);
                    return res.status(500).send({
                        title: 'Get failed'
                    });
                }
                res.json({
                    title: 'Only one was rendered',
                    data: data
                });
            });
        }
    })
    .post(function(req, res){

        var data = req.body;
        console.log(req.body);
        if(!data){
            
            return res.json({
                title: 'No data was added',
                data: data
            });
        }
        
        var AnalyticsArray = [];
        for(let datum of data){
            datum.onDate = new Date(datum.onDate);
            AnalyticsArray.push( new Analytics(datum) );
        }
        Analytics.insertMany(AnalyticsArray,function(err){
            if(err){
                console.log(err);
                return res.json({
                    title: 'Bulk Save failed...'
                });
            }
            res.json({
                title: 'Bulk Save was successful...'
            });
        });
    });

module.exports = router;