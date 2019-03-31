// Require mongoose
const mongoose = require('mongoose');

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

const checkSource = require('../helpers/validate');
// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  // `string` must be of type String. We "trim" it to remove any trailing white space
  // `string` is a required field, and a custom error message is thrown if it is not supplied
  title: {
    type: String,
    trim: true,
    required: 'String is Required',
  },
  // `number` is of type Number
  // `number` must be unique
  // `number` is required. The default mongoose error message is thrown if it is not supplied
  link: {
    type: String,
    unique: true,
    required: true,
  },

  source: {
    type: String,
    required: true,
    validate: [
      input => checkSource.sources.includes(input),
      'Unrecognized Source',
    ],
  },
  comments: {
    type: Array,
  },

  // TODO test schema with dummy data
  // `longstring` must be of type String
  // `longstring` uses a custom validation function to only accept values 6 characters or more
  // A custom error message is thrown if the validation fails
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Example model
module.exports = Article;
