import React from "react";
import "./BulletPoints.css";
import { BiCheck } from "react-icons/bi";

const BulletPoints = () => {
  return (
    <>
      <div className="bullets__mainFrame">
        <div className="bulletsFrame__one">
          <h2 className="whymfoodz__head">Why MFoodz?</h2>

          <div className="whymfoodz__list">
            <BulletList
              title="Quickest"
              description="GrabFood provides the fastest food delivery in the market."
            />
            <BulletList
              title="Easiest "
              description="Now grabbing your food is just a few clicks or taps away. Order online or download our MFoodz app for a faster and more rewarding experience."
            />
            <BulletList
              title="Food for all cravings"
              description="From local fare to restaurant favourites, our wide selection of food will definitely satisfy all your cravings."
            />
            <BulletList
              title="Pay with ease "
              description="It’s easy to get your meals delivered to you."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BulletPoints;

const BulletList = ({ title, description }) => {
  return (
    <>
      <BiCheck
        style={{
          width: "20px",
          height: "20px",
          color: "orange",
          marginTop: "3px",
        }}
      />

      <li>
        <strong>{title}</strong> - {description}
      </li>
    </>
  );
};
