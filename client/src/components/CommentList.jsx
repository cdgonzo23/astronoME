import PropTypes from 'prop-types'

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
      return <h3>No Comments Yet</h3>;
    }
  
    return (
      <>
        <h3 className="pb-4 border-b-[1px] border-dotted border-hover-blue text-lg text-gray-300 font-body" >
          Comments
        </h3>
        <div 
          className="flex-row font-body"
        >
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="">
                <div 
                  className="py-4 text-gray-300 rounded w-full flex flex-col sm:flex-row sm:items-center border-b-[1px] pb-4 border-dotted border-hover-blue"
                >
                  <h5 className="card-header text-[#6e91b8b6]">{comment.commentAuthor}: </h5>
                  <p className="text-sm sm:ml-4">{comment.commentText}</p>
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
