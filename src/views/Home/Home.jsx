import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { CreatePost, Navbar, PostCard, SortByDropdown, TagsCarousel } from "../../components";
import "./Home.scss";

const Home = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <CreatePost />
          <SortByDropdown/>
          <PostCard />
          <PostCard />
          <TagsCarousel/>
        </div>
      </div>
    </>
  );
};
export default Home;
