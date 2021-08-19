import { useState } from "react";
import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Image } from "antd";

import CommentBox from "../CommentBox/CommentBox";
import "./PostCard.scss";
import PostService from "../../services/post.service";

const PostCard = ({ post }) => {
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    setLoading(true);
    setHasLiked(prev => !prev);
    PostService.likePost({ body: { postId: post.postId, empId: post.empId } })
      .then(res => {
        setHasLiked(res.data.hasLiked);
      }, err => {
        console.log(err);
        setHasLiked(prev => !prev);
      })
    setLoading(false);
  }
  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <img
            className="author-img"
            src="https://i.pravatar.cc/100?img=12"
            alt="profile-pic"
          />
          <div className="author">
            <div className="author-name">{post.name}</div>
            <div className="author-designation">
              {post.designation || "Software Developer"}
            </div>
            <div className="post-timestamp">
              {new Date(post.createdAt + 'Z').toLocaleString([], {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        <div className="post-body">
          <div className="post-text">
            {post.content}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus cum, facilis et maxime corrupti maiores, sit mollitia
            enim repellat sapiente repudiandae magnam optio dolore nulla quia
            sequi, itaque non facere!
          </div>
          <div className="post-tags">
            {post.tags?.map((tag, idx) => (
              <span key={idx}>#{tag} </span>
            ))}
          </div>
          <Image
            className="post-img"
            src="http://placehold.jp/600x400.png"
            alt="post-media"
          />
        </div>
        <div className="post-footer">
          <div className="post-metrics" onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
            {post.likesCount} Likes <span>&nbsp;·&nbsp;</span>{" "}
            {post.commentsCount} Comments
          </div>
          <div className="post-interaction-btns">
            <div className="btn" onClick={handleLike}>
              {hasLiked ? <LikeFilled style={{color: "#1f1235"}}/> : <LikeOutlined />}
              <span className="btn-text">Like</span>
            </div>
            <div
              className="btn"
              onClick={() => setCommentBoxVisible(!commentBoxVisible)}
            >
              <CommentOutlined />
              <span className="btn-text">Comment</span>
            </div>
            <div className="btn">
              <ShareAltOutlined />
              <span className="btn-text">Share</span>
            </div>
          </div>
        </div>
        {commentBoxVisible && <CommentBox postId={post.postId}/>}
      </div>
    </>
  );
};
export default PostCard;
