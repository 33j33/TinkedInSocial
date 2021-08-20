import { useSelector } from "react-redux";
import useFeedHook from "../../common/hooks/useFeedHook";
import {
  Navbar,
  PostCard,
  ProfileHeader,
  SortByDropdown,
} from "../../components";
import { userSelector } from "../../selectors/user.selector";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Profile.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const Profile = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  const user = useSelector(userSelector);
  const [secondUser, setSecondUser] = useState({
    entity: {},
    loading: false,
    error: "",
  });
  const { empId } = useParams();

  const { posts, loading, meta, sortBy, setSortBy, fetchMoreData } =
    useFeedHook({ empId: empId || user.entity.empId, type: "self" });

  useEffect(() => {
    setSecondUser({ ...secondUser, loading: true });
    if (empId) {
      UserService.getUser({ id: empId }).then(
        (res) => {
          setSecondUser({ entity: res.data, loading: false, error: "" });
        },
        (err) => {
          console.log(err);
          setSecondUser({entity: {}, loading: false, error: err.response?.data || err?.message})
        }
      );
    }
  }, [empId]);
  
  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <ProfileHeader user={empId ? secondUser :user} />
        <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
        {loading && <h4>Loading...</h4>}
        {!loading && posts.length !== 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={meta.hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h3>No More Posts</h3>}
          >
            {posts?.map((o, idx) => {
              if (o.tagCarousel) {
                return null;
              }
              return <PostCard key={idx} post={o} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
export default Profile;
