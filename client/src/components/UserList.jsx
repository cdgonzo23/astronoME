import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ _id, username }) => {
  return (
    <div key={_id}>
      <h4>
        <Link to={`/users/${_id}`}>
          {username}
        </Link>
      </h4>
    </div>
  );
};

const UserList = ({ users, title }) => {
  if (!users.length) return <h3>No Users</h3>;

  const renderUsers = () => {
    if (!users) return null;
    return users.map(user => <User key={user._id} {...user} />);
  }

  return (
    <>
      <h3>{title}</h3>
      {renderUsers()}
    </>
  );
};

User.propTypes = {
  _id: PropTypes.any,
  username: PropTypes.string,
}

UserList.propTypes = {
  users: PropTypes.array,
  title: PropTypes.string,
}

export default UserList;