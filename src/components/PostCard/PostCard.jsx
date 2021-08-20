import { useState } from "react";
import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Image, Popover } from "antd";
import isUrl from "../../common/helpers/isUrl";
import CommentBox from "../CommentBox/CommentBox";
import "./PostCard.scss";
import PostService from "../../services/post.service";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { userSelector } from "../../selectors/user.selector";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PostCard = ({ post }) => {
  const history = useHistory()
  const user = useSelector(userSelector);

  // state
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [loading, setLoading] = useState(false);

  // handlers
  const handleLike = () => {
    setLoading(true);
    setHasLiked((prev) => !prev);
    PostService.likePost({
      body: { postId: post.postId, empId: user.entity.empId },
    }).then(
      (res) => {
        setHasLiked(res.data.hasLiked);
      },
      (err) => {
        console.log(err);
        setHasLiked((prev) => !prev);
      }
    );
    setLoading(false);
  };

  const redirectOnClick = () => {
    console.log("clicked");
    if (post.empId === user.entity.empId) {
      history.push('/profile')
    }
    else if (post.empId !== user.entity.empId) {
      history.push(`/${post.empId}`)
    }
  }
  // component
  const content = (
    <div className="share-popover">
      <TwitterShareButton
        url={"application/url"}
        title={post.content}
        hashtags={post.tags}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton
        url={"application/url"}
        quote={post.content}
        hashtag={post.tags.join("#")}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
    </div>
  );

  return (
    <>
      <div className="post-card">
        <div className="post-header" onClick={redirectOnClick}>
          <img
            className="author-img"
            src={
              isUrl(post.empImgUrl)
                ? post.empImgUrl
                : "http://placehold.jp/120x120.png"
            }
            alt="profile-pic"
          />
          <div className="author">
            <div className="author-name">{post.name}</div>
            <div className="author-designation">
              {post.designation || "Software Developer"}
            </div>
            <div className="post-timestamp">
              {new Date(post.createdAt + "Z").toLocaleString(["en-IN"], {
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
          {isUrl(post.images?.[0]) && (
            <Image className="post-img" src={post.images[0]} alt="post-media" />
          )}
        </div>
        <div className="post-footer">
          <div
            className="post-metrics"
            onClick={() => setCommentBoxVisible(!commentBoxVisible)}
          >
            {post.likesCount} Likes <span>&nbsp;·&nbsp;</span>{" "}
            {post.commentsCount} Comments
          </div>
          <div className="post-interaction-btns">
            <div className="btn" onClick={handleLike}>
              {hasLiked ? (
                <LikeFilled style={{ color: "#1f1235" }} />
              ) : (
                <LikeOutlined />
              )}
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
              <Popover
                content={content}
                title="Share"
                overlayStyle={{ width: "120px" }}
                trigger="click"
              >
                <ShareAltOutlined />
                <span className="btn-text">Share</span>
              </Popover>
            </div>
          </div>
        </div>
        {commentBoxVisible && <CommentBox postId={post.postId} />}
      </div>
    </>
  );
};
export default PostCard;
