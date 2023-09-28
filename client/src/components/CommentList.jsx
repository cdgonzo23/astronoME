import PropTypes from 'prop-types'

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
      return <h3>No Comments Yet</h3>;
    }
  
    return (
      <>
        <h3 style={{ paddingBottom: '4px', borderBottom: '1px dotted #1c8ebd' }}>
          Comments
        </h3>
        <div 
          className="flex-row"
          style={{ borderBottom: '1px dotted #1c8ebd' }}
        >
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="">
                <div 
                  className="my-3 p-2 text-light"
                  style={{ backgroundColor: '#2C2B30', borderRadius: '4px'}}
                >
                  <h5 className="card-header">{comment.commentAuthor}: </h5>
                  <p className="card-body px-4 text-sm">{comment.commentText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
};
  
export default CommentList;


CommentList.propTypes = {
  comments: PropTypes.array,
};
