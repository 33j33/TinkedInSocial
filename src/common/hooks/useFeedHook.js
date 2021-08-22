import { useState, useEffect } from "react";
import PostService from "../../services/post.service";

const useFeedHook = ({ empId, type, tag }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({hasMore: false});
  const [sortBy, setSortBy] = useState("trending");
  const [page, setPage] = useState(0);
  const [tagState, setTagState] = useState(tag);

  const fetchData = async () => {
    setPage(0);
    setLoading(true)
    try {
      const res = await PostService.fetchPosts({ params: { sortBy, type, page: 0, empId, tag:tagState } })
      setPosts([...res.data.content, { tagCarousel: true }]);
      setMeta({ hasMore: !res.data.last});
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(prev => prev + 1);
    try {
      const res = await PostService.fetchPosts({ params: { sortBy, type, page: nextPage, empId, tag: tagState } })
      setPosts([...posts, ...res.data.content, { tagCarousel: true }]);
      setMeta({ hasMore: !res.data.last});
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, tagState])

  return { posts, loading, meta, sortBy, setSortBy, fetchMoreData, fetchData, setTagState }
}

export default useFeedHook;