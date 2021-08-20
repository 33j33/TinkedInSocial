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
import placeholderImg from "../../assets/placeholder.png";

const PostCard = ({ post }) => {
  const history = useHistory();
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
      history.push("/profile");
    } else if (post.empId !== user.entity.empId) {
      history.push(`/${post.empId}`);
    }
  };
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
          <Image
            className="author-img"
            src={post.empImgUrl || "error"}
            fallback="data:image/png;base64,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"
            alt="profile-pic"
            preview={false}
            // placeholder="http://placehold.jp/120x120.png"
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
