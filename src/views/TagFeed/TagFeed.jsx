import { Divider, Tag } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFeedHook from "../../common/hooks/useFeedHook";
import { Navbar, PostCard } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { userSelector } from "../../selectors/user.selector";
import "./TagFeed.scss";

const TagFeed = () => {
  const { tag } = useParams();

  const user = useSelector(userSelector);
  const { posts, loading, meta, fetchMoreData, setTagState } = useFeedHook({
    empId: user.entity.empId,
    type: "feed",
    tag
  });
  useEffect(() => {
    setTagState(tag)
  }, [tag])

  return (
    <>
      <Navbar />
      <div className="tag-feed">
        <Divider dashed orientation="left">
          #{tag}
        </Divider>
        {loading && <Spinner />}
        {!loading && posts.length !== 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={meta.hasMore}
            loader={<Spinner />}
            endMessage={<h3>No More Posts</h3>}
          >
            {posts?.map((o, idx) => {
              if (o.tagCarousel || o.colleagueCarousel) {
                return null;
              }
              return <PostCard key={idx} post={o} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default TagFeed;
