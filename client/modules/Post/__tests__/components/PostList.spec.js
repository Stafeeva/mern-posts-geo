import React from 'react';
import test from 'ava';
import PostList from '../../components/PostList';
import { mountWithIntl } from '../../../../util/react-intl-test-helper';

const posts = [
  {
    name: 'Prashant',
    title: 'Hello Mern',
    slug: 'hello-mern',
    cuid: 'f34gb2bh24b24b2',
    content: "All cats meow 'mern!'",
    address: 'Lausanne, Switzerland',
  },
  {
    name: 'Mayank',
    title: 'Hi Mern',
    slug: 'hi-mern',
    cuid: 'f34gb2bh24b24b3',
    content: "All dogs bark 'mern!'",
    address: 'Nyon, Switzerland',
  },
];

test('renders the list', t => {
  const wrapper = mountWithIntl(
    <PostList posts={posts} handleDeletePost={() => {}} />
  );

  console.log('wrapper', wrapper);

  t.is(wrapper.find('PostListItem').length, 2);
});
