import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_BLOGPOST } from "../utils/queries";

const SingleBlogpost = () => {
  const { blogpostId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BLOGPOST, {
    // pass URL parameter
    variables: { blogpostId: blogpostId },
  });

  const blogpost = data?.blogpost || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center mx-12 my-12 md:my-32 text-gray-300">
      <div className="bg-darkest px-8 pt-8 pb-4 rounded flex flex-col shadow-[5px_2px_53px_5px_#6e91b8b6] w-full md:w-[60%]">
        <div className="flex flex-col w-full pb-4 border-b-[1px] border-dotted border-hover-blue">
          <Link className="text-2xl hover:text-hover-blue" to={`/user/${blogpost.blogpostAuthor}`}>
            {blogpost.blogpostAuthor}
          </Link>
          <p className="text-md italic text-gray-500">{blogpost.blogpostLocation}</p>
          <p className="text-md italic text-gray-500">{blogpost.createdAt}</p>
        </div>

        <blockquote className="my-4 text-2xl tracking-normal leading-8">{blogpost.blogpostText}</blockquote>

        {blogpost.imageUrl ? (
            <div>
              <img className="w-96 mt-6" src={blogpost.imageUrl} alt={blogpost.imageUrl} />
            </div>
          ) : (
            ""
          )}
      </div>

      <div className="my-5 w-full md:w-[60%]">
        <CommentList comments={blogpost.comments} />
      </div>
      <div className="m-3 flex justify-center w-full md:w-[60%]">
        <CommentForm blogpostId={blogpost._id} />
      </div>
    </div>
  );
};

export default SingleBlogpost;
