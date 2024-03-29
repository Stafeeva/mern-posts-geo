import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

const EARTH_RADIUS = 6371;

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  const { contains, lat, lng, radius = 10 } = req.query;

  const find = {};
  let sort;

  if (lat && lng) {
    find.location = {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / EARTH_RADIUS],
      },
    };
  }

  if (contains) {
    find.$text = { $search: sanitizeHtml(contains) };
  } else {
    sort = '-dateAdded';
  }

  Post.find(find).sort(sort).exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content || !req.body.post.address) {
    res.status(403).end();
  }

  const { name, title, content, address } = req.body.post;

  const newPost = new Post({
    name,
    title,
    content,
    address: address.formattedAddress,
    location: {
      type: 'Point',
      coordinates: [
        address.location.lng,
        address.location.lat,
      ],
    },
  });

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  newPost.address = sanitizeHtml(newPost.address);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
