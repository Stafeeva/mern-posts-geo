import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import PostListItem from './PostListItem/PostListItem';

const PostList = props => {
  const { handleDeletePost, posts } = props;
  const { messages } = props.intl;

  if (posts.length < 1) {
    return (
      <div className="listView">
        <p>{messages.noPosts}</p>
      </div>
    );
  }

  return (
    <div className="listView">
      {posts.map(post => (
        <PostListItem
          post={post}
          key={post.cuid}
          onDelete={() => handleDeletePost(post.cuid)}
        />
      ))}
    </div>
  );
};

PostList.propTypes = {
  intl: intlShape.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default injectIntl(PostList);
