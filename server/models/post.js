import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  address: { type: 'String', required: true },
  location: {
    type: {
      type: 'String',
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: ['Number'],
      required: true,
    },
  },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
