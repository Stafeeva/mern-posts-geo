import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { PostCreateWidget } from '../../components/PostCreateWidget/PostCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addPost: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PostCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewPost" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
});

test('calls addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} />
  );

  wrapper.setState({
    name: 'David',
    title: 'Title',
    content: 'Content',
    address: 'Address',
  });

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('David', 'Title', 'Content', 'Address'));
});

test('empty form doesn\'t call addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});
