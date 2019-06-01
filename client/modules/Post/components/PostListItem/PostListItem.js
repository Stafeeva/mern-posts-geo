import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';
import ReactMarkdown from 'react-markdown';

const PostListItem = props => {
  const {
    address,
    content,
    cuid,
    name,
    slug,
    title,
  } = props.post;

  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${slug}-${cuid}`}>
          {title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {name}</p>
      <p className={styles['post-address']}>{address}</p>
      <div className={styles['post-desc']}><ReactMarkdown source={content} /></div>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    address: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
