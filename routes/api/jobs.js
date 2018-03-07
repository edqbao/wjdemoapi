var router = require('express').Router();
var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var User = mongoose.model('User');
var auth = require('../auth');

router.post('/create', function(req, res, next){
  var job = new Job();
  job.address = req.body.job.address;
  job.start = req.body.job.start;
  job.end = req.body.job.end;
  job.userId = req.body.job.userId;
  job.status = req.body.job.status;

  job.save().then(function(){
    return res.json({job: job.toJobJSON()});
  }).catch(next);
});

router.get('/updatestatus/:id/', function(req, res, next){
  Job.findById(req.params.id).then(function(job){
    if (!job) { return res.sendStatus(401); }
    job.status = req.headers.status;
    return job.save().then(function(){
      return res.json(job);
    });
  }).catch(next);
});

router.get('/job', function(req, res, next){
  console.log(req.headers.id)
  Job.findById(req.headers.id).then(function(job){
    if (!job) { return res.sendStatus(401); }
    return res.json({job: job.toJobJSON()});
  }).catch(next);
});

router.get('/jobs', function(req, res, next){
  console.log(req.headers.id)
  Job.find().sort({status: 1, end:1}).limit(20).then(function(jobs){
    if (!jobs) { return res.sendStatus(401); }
    return res.json(jobs);
  }).catch(next);
});

router.get('/jobs/:id', function(req, res, next){
  console.log(req.params.id)
  Job.find({userId:req.params.id}).sort({status: 1, end:1}).limit(20).then(function(jobs){
    if (!jobs) { return res.sendStatus(401); }
    return res.json(jobs);
  }).catch(next);
});

module.exports = router;
