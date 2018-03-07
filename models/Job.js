var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var JobSchema = new mongoose.Schema({
  address: String,
  start: Date,
  end: Date,
  userId: String,
  status: {type: String,
        enum: ['Completed', 'Active']}
}, {timestamps: true});

JobSchema.plugin(uniqueValidator, {message: 'is already taken'});

JobSchema.methods.toJobJSON = function(){
  return {
    address: this.address,
    start: this.start,
    end: this.end,
    userId: this.userId,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Job', JobSchema);
