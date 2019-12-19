import {Schema} from 'mongoose';

const LoggerSchema = new Schema({
  reqId: String,
  ip: String,
  reqHeaders: Object,
  resHeaders: String,
  hostName: String,
  url: String,
  method: String,
  body: Object,
  query: Object,
  params: Object,
  resPayload: Object,
  time: Date,
  logLevel: Object,
  httpCode: Number,
  httpStatusText: String,
  message: String
});

export default LoggerSchema;
