import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Auth from '../utils/auth';
import DeleteBtn from "../components/DeleteBtn";
import iconList from "../components/iconList";

import { QUERY_SINGLE_BLOGPOST } from "../utils/queries";

const SingleBlogpost = () => {
  const { blogpostId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BLOGPOST, {
    // pass URL parameter
    variables: { blogpostId: blogpostId },
  });
  const userData = Auth.getProfile();
  const viewer = userData.data.username;
  const blogpost = data?.blogpost || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center mx-12 my-12 md:my-32 text-gray-300 font-body">
      <div className="bg-darkest px-8 pt-8 pb-4 rounded flex flex-col shadow-[5px_2px_53px_5px_#6e91b8b6] w-full md:w-[60%]">
        <div className="flex flex-col w-full pb-4 border-b-[1px] border-dotted border-hover-blue">
          <div className="flex flex-row justify-start items-center"> 
            <div className="flex-shrink-0 mr-2 mb-2">
              <img
                className="mx-auto h-12 w-12 rounded-full"
                src={iconList.find((icon) => icon.id === blogpost.blogpostAuthor.icon).src}
                alt={iconList.find((icon) => icon.id === blogpost.blogpostAuthor.icon).label}
              ></img>
            </div>
            <div> 
              <Link to={`/user/${blogpost.blogpostAuthor.username}`} className="hover:text-hover-blue text-lg font-heading">
                {blogpost.blogpostAuthor.username}
                {/* {console.log(blogpost)} */}
              </Link>
              <div className="text-sm text-gray-500 italic">{blogpost.blogpostAuthor.location}</div>
              <div className="text-sm text-gray-500 italic">{blogpost.createdAt}</div>
            </div>
          </div>
        </div>

        <blockquote className="my-4 text-2xl tracking-normal leading-8">{blogpost.blogpostText}</blockquote>

        {blogpost.imageUrl ? (
              <div className="flex justify-center">
                <img className="w-96 mb-6 rounded-md shadow-[2px_1px_26px_2px_#000000]" style={{ padding: '1px', backgroundColor: '#212C3B' }} src={blogpost.imageUrl} alt={blogpost.imageUrl} />
              </div>
            ) : (
              ""
            )}

        {(viewer === blogpost.blogpostAuthor.username) ? (
          <div className="flex md:flex-row flex-col justify-end">
            <DeleteBtn blogpostId={blogpost._id} />
          </div>  
        ) : (<div />)}
      </div>

      <div className="my-5 w-full md:w-[60%] font-body">
        <CommentList comments={blogpost.comments} />
      </div>
      <div className="m-3 flex justify-center w-full md:w-[60%] font-body">
        <CommentForm blogpostId={blogpost._id} />
      </div>
    </div>
  );
};

export default SingleBlogpost;
