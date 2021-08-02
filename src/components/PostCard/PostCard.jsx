import { Image } from "antd";
import "./PostCard.scss";
import {
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
const PostCard = () => {
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
            <div className="author-name">John Doe</div>
            <div className="author-designation">Software Developer</div>
            <div className="post-timestamp">12:30PM, 12/07/21</div>
          </div>
        </div>
        <div className="post-body">
          <div className="post-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus cum, facilis et maxime corrupti maiores, sit mollitia
            enim repellat sapiente repudiandae magnam optio dolore nulla quia
            sequi, itaque non facere!
          </div>
          <div className="post-tags">#React #Node #Redux</div>
          <Image
            className="post-img"
            src="http://placehold.jp/600x400.png"
            alt="post-media"
          />
        </div>
        <div className="post-footer">
          <div className="post-metrics">
            4 Likes <span>&nbsp;·&nbsp;</span> 23 Comments
          </div>
          <div className="post-interaction-btns">
            <div className="btn">
              <LikeOutlined />
              <span className="btn-text">Like</span>
            </div>
            <div className="btn">
              <CommentOutlined />
              <span className="btn-text">Comment</span>
            </div>
            <div className="btn">
              <ShareAltOutlined />
              <span className="btn-text">Share</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostCard;
