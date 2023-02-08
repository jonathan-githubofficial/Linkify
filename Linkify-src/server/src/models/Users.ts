import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Users = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});