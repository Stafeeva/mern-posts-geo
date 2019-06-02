import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  const { contains, lat, lng, radius } = req.query;

  let find = {};

  if (contains) {
    find = {
      $text: { $search: sanitizeHtml(contains) },
    };
  }

  if (lat && lng) {
    const METERS_PER_KM = 1000;

    find = {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: (radius || 1000) * METERS_PER_KM,
        },
      },
    };
  }

  // Post.find(find).sort('-dateAdded')
  Post.find(find).exec((err, posts) => {
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
