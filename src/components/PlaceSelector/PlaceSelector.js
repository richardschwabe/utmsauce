import React from 'react';
import "./PlaceSelector.scss"

import shareConfig from "../../shareplaces.json"

export default function PlaceSelector(props) {
    
  const sharePlaces = shareConfig.map((i) => {
    let places = i.places.map((place) => {
      let val = `${i.name.toLowerCase()}-${place.toLowerCase()}`;

      return (
        <div className="inline field" key={val}>
          <input type="checkbox" onClick={() => props.toggleItem(val)} />
          <label className="ui checkbox">{place}</label>
        </div>
      );
    });

    return (
      <div className={`cell medium-4 ${i.name}`} key={i.name}>
        <h4>{i.name.toUpperCase()}</h4>
        {places}
      </div>
    );
  });

  return (
    <>
        {sharePlaces}
    </>
  );
}
