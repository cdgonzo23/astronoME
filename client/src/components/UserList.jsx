import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ _id, username }) => {
  return (
    <div key={_id}>
      <h4>
        <Link to={`/users/${_id}`}>
          <div className="text-[#6e91b8]">{username}</div>
        </Link>
      </h4>
    </div>
  );
};

const UserList = ({ users, title }) => {
  if (!users.length) return <h3>No Users</h3>;

  const renderUsers = () => {
    if (!users) return null;
    return users.map(user =>
      <>
        <card className="bg-darkest col-span-3 p-8 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <User key={user._id} {...user} />
          <hr className="my-4" />
        </card>

      </>
    );
  }

  return (
    <>
      <h3 className='flex justify-center'>{title}</h3>
      <div className="grid grid-cols-3 lg:grid-cols-9 gap-12 justify-evenly mx-12 lg:mx-32 my-24 lg:my-32 text-gray-300 font-normal">
          {renderUsers()}
      </div>
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