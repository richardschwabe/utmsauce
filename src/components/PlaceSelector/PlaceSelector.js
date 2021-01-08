import React from 'react';
import "./PlaceSelector.scss"

import  { SocialIcon } from "react-social-icons"

import shareConfig from "../../shareplaces.json"

export default function PlaceSelector(props) {
    
  const sharePlaces = shareConfig.map((i) => {
    let places = i.places.map((place) => {
      let val = `${i.name.toLowerCase()}-${place.toLowerCase()}`;

      return (
        <li key={val}>
          <input type="checkbox" onClick={() => props.toggleItem(val)} />
          <label className="ui checkbox">{place}</label>
        </li>
      );
    });

    return (
      <div className={`cell medium-4 place place-${i.icon}`} key={i.name}>
        <h4><SocialIcon network={i.icon} /> {i.name.toUpperCase()}</h4>
        <ul className="">
        {places}
        </ul>
        
      </div>
    );
  });

  return (
    <>
        {sharePlaces}
    </>
  );
}
