import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {

  render() {
    const { user } = this.props;

    if(!user) {
      return null
    }

    return(
      <div>{user.name}</div>
    )
  }
}

const mapStatetoProps = (state, ownProps) => {
  return { user: state.users.find( user => user.id === ownProps.userId) }
}

export default connect(mapStatetoProps)(UserHeader)