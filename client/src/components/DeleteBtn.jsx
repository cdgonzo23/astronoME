import { useMutation } from "@apollo/client";
import { REMOVE_BLOGPOST } from "../utils/mutations";
import { QUERY_BLOGPOSTS } from "../utils/queries";

function DeleteBtn(blogpostId) {
  console.log(blogpostId.blogpostId);
  const [removeBlogpost] = useMutation(REMOVE_BLOGPOST, {
    refetchQueries: [QUERY_BLOGPOSTS, "blogposts"],
  });
  // console.log("blogposts", blogposts);
  async function handlePostDelete(blogpostId) {
    // e.preventDefault();
    try {
      await removeBlogpost({
        variables: {
          blogpostId: blogpostId,
        },
      });
      if (document.location.pathname === '/me') {
        document.location.reload();
      } else {
        document.location.replace('/community');
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <button
      onClick={() => handlePostDelete(blogpostId.blogpostId)}
      className="text-gray-300 bg-galaxy-red hover:bg-[#692217] hover:text-white rounded-md px-4 py-2 text-sm font-body"
    >
      Delete
    </button>
  )
}

export default DeleteBtn;