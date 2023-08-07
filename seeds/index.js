const userSeeds = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

// Export the seed functions in a single object
module.exports = {
  userSeeds,
  postSeeds,
  commentSeeds
};
