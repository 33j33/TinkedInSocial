import { useState } from "react";
import { Tag } from "antd";
import "./TagsCarousel.scss";

const TagsCarousel = () => {
  const { CheckableTag } = Tag;
  const tagsData = ["React", "AI", "Node", "ML", "JS", "Java", "SQL", "MongoDB", "Books", "Music", "Sports"];
  const [selectedTags, setSelectedTags] = useState(["Books"]);

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <div className="scrolling-wrapper">
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleTagChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
};

export default TagsCarousel;
