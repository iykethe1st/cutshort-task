import { useEffect, useState } from "react";
import Button from "../components/Button";
import NewPost from "../components/NewPost";
import NewToDo from "../components/NewToDo";
import Posts from "../components/Posts";
import ToDo from "../components/ToDo";
import auth from "../services/authService";

const Home = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  const [showToDo, setShowToDo] = useState(true);
  const [addToDo, setAddToDo] = useState(false);
  const [addPost, setAddPost] = useState(false);

  function handlePostClick() {
    setShowPosts(true);
    setShowToDo(false);
    setAddToDo(false);
    setAddPost(false);
  }

  function handleToDoClick() {
    setShowToDo(true);
    setShowPosts(false);
    setAddToDo(false);
    setAddPost(false);
  }
  function handleAddToDo() {
    setAddToDo(true);
    setShowPosts(false);
    setShowToDo(false);
    setAddPost(false);
  }
  function handleAddPost() {
    setAddPost(true);
    setAddToDo(false);
    setShowPosts(false);
    setShowToDo(false);
  }
  function handleShowPosts() {
    setShowPosts(true);
    setShowToDo(false);
    setAddToDo(false);
    setAddPost(false);
  }

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-1/4 pl-8 pt-8 bg-slate-200 h-screen gap-2 flex flex-col">
        <form action="">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search"
            className="p-2 rounded w-2/3"
          />
        </form>
        <div className="flex gap-4">
          <Button onClick={handleAddToDo} label="Add To Do" />
        </div>
      </div>
      <div className="flex w-3/4">
        <div>
          {showPosts && (
            <Posts onPostAdded={handleShowPosts} user={currentUser} />
          )}

          {addToDo && <NewToDo user={currentUser} />}
          {showToDo && <ToDo user={currentUser} />}
        </div>
        <div className="flex gap-4 h-[4rem] py-4 px-6 justify-end w-3/4">
          <Button onClick={handlePostClick} label="Posts" />
          <Button onClick={handleToDoClick} label="To Do" />
          {currentUser ? (
            <div>{currentUser.name}</div>
          ) : (
            <a href="sign-up">
              <Button label="Sign Up" />
            </a>
          )}

          {currentUser ? (
            <a href="/logout">
              <Button label="Log Out" />
            </a>
          ) : (
            <a href="sign-in">
              <Button label="Log In" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
