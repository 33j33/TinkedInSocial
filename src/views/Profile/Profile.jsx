import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFeedHook from "../../common/hooks/useFeedHook";
import {
  Navbar,
  PostCard,
  ProfileHeader,
  SortByDropdown,
} from "../../components";
import { userSelector } from "../../selectors/user.selector";
import UserService from "../../services/user.service";
import "./Profile.scss";
import Spinner from "../../components/Spinner/Spinner";

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
    if (empId) {
      setSecondUser({ ...secondUser, loading: true });
      UserService.getUser({ id: empId }).then(
        (res) => {
          setSecondUser({ entity: res.data, loading: false, error: "" });
        },
        (err) => {
          console.log(err);
          setSecondUser({
            entity: {},
            loading: false,
            error: err.response?.data || err?.message,
          });
        }
      );
    }
  }, [empId]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-container">
          <ProfileHeader
            user={empId ? secondUser : user}
            isSecondUser={empId ? true : false}
          />
          <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
          {loading && <Spinner />}
          {!loading && posts.length === 0 && <h3>No Posts</h3>}
          {!loading && posts.length !== 0 && (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={meta.hasMore}
              loader={<Spinner />}
              endMessage={<h3>No More Posts</h3>}
            >
              {posts?.map((o, idx) => {
                return <PostCard key={idx} post={o} />;
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;
