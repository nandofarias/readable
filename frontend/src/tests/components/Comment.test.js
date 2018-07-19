import React from 'react';
import { mount, shallow } from 'enzyme';
import { Comment, mapStateToProps } from '../../components/Comment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const props = {
  comment: {
    id: 'test01',
    author: 'test author',
    body: 'test body',
    voteScore: 2
  },
  classes: {},
  user: {
    username: 'test author'
  },
  deleteComment: jest.fn(),
  upVoteComment: jest.fn(),
  downVoteComment: jest.fn()
};

describe('/components/Comment', () => {
  it('should render properly', () => {
    const wrapper = mount(<Comment {...props} />);
    expect(wrapper.find('Typography').contains('test body')).toEqual(true);
    expect(wrapper.find('CardHeader').props().title).toEqual('test author');
    expect(wrapper.find('CardHeader').props().subheader).toEqual('2 Votes');
  });

  it('should render menu if the user is the same as the author', () => {
    const wrapper = mount(<Comment {...props} />);
    expect(wrapper.find('IconButton#menu')).toHaveLength(1);
  });

  it('should not render menu if the user is not the same as the author', () => {
    const newProps = { ...props, user: { username: 'author 2' } };
    const wrapper = mount(<Comment {...newProps} />);
    expect(wrapper.find('IconButton#menu')).toHaveLength(0);
  });

  it('should open close menu', () => {
    const wrapper = mount(<Comment {...props} />);
    wrapper.find('IconButton#menu').simulate('click');
    expect(wrapper.state().anchorMenu).not.toBeNull();
    wrapper.instance().handleMenuClose();
    expect(wrapper.state().anchorMenu).toBeNull();
  });

  it('should render edit comment', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...props} />
      </Provider>
    );
    wrapper.find('IconButton#menu').simulate('click', {
      target: {}
    });
    wrapper.find('MenuItem#edit').simulate('click');
    expect(wrapper.find('EditComment')).toHaveLength(1);
  });

  it('should delete comment', () => {
    const wrapper = mount(<Comment {...props} />);
    wrapper.find('IconButton#menu').simulate('click', {
      target: {}
    });
    wrapper.find('MenuItem#delete').simulate('click');
    expect(props.deleteComment).toHaveBeenCalled();
  });

  it('should up vote comment', () => {
    const wrapper = mount(<Comment {...props} />);
    wrapper.find('IconButton#up-vote').simulate('click');
    expect(props.upVoteComment).toHaveBeenCalled();
  });

  it('should down vote comment', () => {
    const wrapper = mount(<Comment {...props} />);
    wrapper.find('IconButton#down-vote').simulate('click');
    expect(props.downVoteComment).toHaveBeenCalled();
  });

  it('should handle finish editing', () => {
    const wrapper = shallow(<Comment {...props} />);
    wrapper.instance().handleFinishEditComment();
    expect(wrapper.state().anchorMenu).toEqual(false);
    expect(wrapper.state().editable).toEqual(false);
  });

  it('should map state to props', () => {
    const returned = mapStateToProps(props);
    expect(returned).toEqual({ user: props.user });
  });
});
