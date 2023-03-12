import Button from "./Button";
import { getPosts } from "../services/postService";
import { useEffect, useState } from "react";
import NewPost from "./NewPost";

const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [addPost, setAddPost] = useState(false);

  const handleClick = (post) => {
    setActivePost(post);
    setAddPost(false);
  };

  const handleAddPost = () => {
    setAddPost(true);
    setActivePost(null);
  };

  const handleAddedPost = () => {
    setAddPost(false);
    setActivePost(null);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await getPosts();
      setPosts(data);
    }
    fetchData();
  }, [posts]);
  return (
    <div className="flex gap-8 p-8 items-start">
      <div className="flex gap-4 flex-col w-[15rem]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Posts</h1>
          <Button onClick={handleAddPost} label="New Post" />
        </div>
        {posts.map((post) => (
          <div
            onClick={() => handleClick(post)}
            className="bg-slate-200 p-2 border-b-2 border-slate-300 w-full active:bg-slate-300 cursor-pointer"
          >
            {post.title}
          </div>
        ))}
      </div>
      {activePost && (
        <div className="flex flex-col gap-4 w-[25rem] mt-12">
          <div className="font-bold">{activePost.title}</div>
          <div className="">{activePost.content}</div>
          <div className="italic text-sm text-right">
            by {activePost.user.name}
          </div>
          {Array.isArray(activePost.comments) && (
            <div className="flex flex-col">
              <em className="text-sm font-bold">Comments</em>
              <div className="flex flex-col gap-4">
                {activePost.comments.map((comment) => (
                  <div key={comment.id}>
                    <em className="text-sm">{comment.comment}</em>
                    <em>~ {comment.name}</em>
                  </div>
                ))}
              </div>
            </div>
          )}
          <textarea
            className="border-2 rounded p-2"
            name=""
            id=""
            cols="30"
            rows="3"
            placeholder="Add a comment"
          />

          <Button label="send" />
        </div>
      )}

      {addPost && <NewPost onPostAdded={handleAddedPost} user={user} />}
    </div>
  );
};

export default Posts;
