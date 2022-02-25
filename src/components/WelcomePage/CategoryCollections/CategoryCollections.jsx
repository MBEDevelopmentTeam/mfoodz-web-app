import React from "react";
import "./CategoryCollections.css";
import JsonData from "../../Website/data/data.json";
import ScrollContainer from "react-indiana-drag-scroll";
let itemCollections = JsonData.Team;

const CategoryCollections = () => {
  return (
    <div className="cc__mainFrame">
      <div className="cc__mainFrameTwo">
        <h2 className="mainFrame__text1">There's something for everyone!</h2>

        <div className="CC__Section">
          <ScrollContainer
            horizontal={true}
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            {itemCollections
              ? itemCollections.map((d, index) => (
                  <CategoryItem key={index} image={d.img} name={d.name} />
                ))
              : "loading"}
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
};
export default CategoryCollections;

export function CategoryItem({ image, name, key }) {
  return (
    <div key={key} className="catItem__box">
      <div className="catItem__image">
        <img className="catItem__image" src={image} alt="..." />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
        className="caption"
      >
        <h4>{name}</h4>
      </div>
    </div>
  );
}
