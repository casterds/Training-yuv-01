import React, { useState } from "react";
import "./Mating.css";
import MatingCharCard from "./MatingCharCard";
import fheart from "../images/icons/heart-solid.svg";
import { useNavigate } from "react-router-dom";
import CustomButton from "./customButton";

export default function Mating() {
  const navigate = useNavigate();

  const [charList, setCharList] = useState([
    { name: "Sanskar", gender: "male" },
    { name: "Krimshanu", gender: "male" },
    { name: "Ritvij", gender: "male" },
    { name: "Arihant", gender: "male" },
    { name: "Shreya", gender: "female" },
    { name: "Aditi", gender: "female" },
  ]);
  const [maleCharList] = useState(
    charList.filter((item) => {
      return item.gender === "male";
    })
  );
  const [femaleCharList] = useState(
    charList.filter((item) => {
      return item.gender === "female";
    })
  );
  const [mateStatus, setMateStatus] = useState(false);
  const [mateMale, setMateMale] = useState();
  const [mateFemale, setMateFemale] = useState();
  const selectFunc = (name) => {
    const selectedItem = charList.filter((item) => {
      return item.name === name;
    })[0];
    if (selectedItem.gender === "male") {
      setMateMale(selectedItem);
    } else {
      setMateFemale(selectedItem);
    }
    console.log(selectedItem);
  };
  const deselectFunc = (gender) => {
    if (gender === "male") {
      setMateMale();
    } else if (gender === "female") {
      setMateFemale();
    }
  };
  const mateFunc = () => {
    if ((!mateMale || !mateFemale) && !mateStatus) {
      alert("Choose mates!!");
    } else {
      setMateMale();
      setMateFemale();
      setMateStatus((prev) => !prev);
    }
  };
  return (
    <div className="mating-container">
      <div className="mating-master">
        <div className="grid-mating-item mating-chars">
          <div className="grid-flex-parent">
            {maleCharList.map((item, index) => (
              <MatingCharCard
                key={index}
                gender="male"
                name={item.name}
                selectFunc={selectFunc}
                percent={100}
                hearts={3}
              />
            ))}
          </div>
        </div>
        <div className="grid-mating-item">
          {!mateStatus ? (
            <>
              <div className="mating-area">
                <div className="mating-final">
                  {mateMale && (
                    <MatingCharCard
                      name={mateMale.name}
                      gender={mateMale.gender}
                      deselectFunc={deselectFunc}
                      percent={100}
                      hearts={4}
                    />
                  )}
                </div>
                <div className="mating-final plus-sign">
                  <img
                    src={fheart}
                    alt=""
                    className="MatingCharCard-heart"
                  ></img>
                </div>
                <div className="mating-final">
                  {mateFemale && (
                    <MatingCharCard
                      name={mateFemale.name}
                      gender={mateFemale.gender}
                      deselectFunc={deselectFunc}
                      percent={100}
                      hearts={4}
                    />
                  )}
                </div>
              </div>
              <div
                style={{ margin: "0px auto 0px auto", width: "fit-content" }}
              >
                <CustomButton onClick={mateFunc} text="mate" />
              </div>
            </>
          ) : (
            <>
              <div className="mating-product-container">
                <div className="mating-product">
                  <MatingCharCard
                    name="Aarti"
                    gender="female"
                    percent={100}
                    deselectFunc={() => {
                      navigate("/characterlist");
                    }} // on clicking product of mating
                    hearts={4}
                  />
                </div>
              </div>
              <div
                style={{ margin: "0px auto 0px auto", width: "fit-content" }}
              >
                <CustomButton onClick={mateFunc} text="mate again" />
              </div>
            </>
          )}
        </div>
        <div className="grid-mating-item mating-chars">
          <div className="grid-flex-parent">
            {femaleCharList.map((item, index) => (
              <MatingCharCard
                key={index}
                gender="female"
                name={item.name}
                selectFunc={selectFunc}
                percent={100}
                hearts={4}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}