import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dateFormat from "dateformat";

function App() {
  const shareConfig = [
    {
      name: "Facebook",
      places: ["post", "story", "ad"],
    },
    {
      name: "Instagram",
      places: ["story", "profile"],
    },
    {
      name: "newsletter",
      places: ["main"],
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [url, setUrl] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [places, setPlaces] = useState({})

  const [linkList, setLinkList] = useState([])

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCampaignChange = (event) => {
    setCampaignName(event.target.value);
  };

  const generateLinks = () => {
    console.log("Generating", url, campaignName);
    let campaignIdentifierDateString = dateFormat(startDate, "yyyymmdd");
    console.log(campaignIdentifierDateString);
    
    console.log("Original places", places)
    let addedPlaces = Object.keys(places).filter(i =>  places[i] === 1)

    console.log(addedPlaces);

    let utmStartChar = "?"
    if ( url.indexOf("?") > -1){
      utmStartChar = "&"
    }

    let newLinkList = []
    let urlUTMCampaignPart = `${utmStartChar}utm_campaign=${campaignIdentifierDateString}-${campaignName}`
    
    let urls = []
    addedPlaces.map(i => {
      let splittedItem = i.split("-")
      let urlUTMSource = splittedItem[0]
      let urlUTMMedium = splittedItem[1]
      let finalUrl = `${urlUTMCampaignPart}&utm_source=${urlUTMSource}&utm_medium=${urlUTMMedium}`
      urls.push(url + finalUrl)
    })
    setLinkList(urls)
  };

  const toggleSourceMedium = (value) => {
    const newPlaces = {...places}
    if (value in newPlaces){
      newPlaces[value] = 0
    } else {
      newPlaces[value] = 1
    }
    setPlaces(newPlaces)
  };

  const sharePlaces = shareConfig.map((i) => {
    let places = i.places.map((place) => {
      let val = `${i.name.toLowerCase()}-${place.toLowerCase()}`;

      return (
        <div className="inline field" key={val}>
          <input type="checkbox" onClick={() => toggleSourceMedium(val)} />
          <label className="ui checkbox">{place}</label>
        </div>
      );
    });

    return (
      <div className="inline field" key={i.name}>
        <h3>{i.name}</h3>
        {places}
      </div>
    );
  });

  return (
    <div className="ui container">
      <h1>URL</h1>
      <div className="ui input fluid">
        <input
          onChange={handleUrlChange}
          value={url}
          type="text"
          placeholder="URL...."
        />
      </div>
      <h2>What is the campaign name?</h2>
      <div className="ui input fluid">
        <input
          type="text"
          placeholder="Campaign Name"
          value={campaignName}
          onChange={handleCampaignChange}
        />
      </div>

      <h2>Choose Campaign Source & Medium</h2>
      <div className="ui form">{sharePlaces}</div>

      <h2>When will the campaign run?</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      <h2>Finalise</h2>
      <button className="ui button primary" onClick={generateLinks}>
        Generate
      </button>

      <h2>Results</h2>
      {linkList.length > 0 ? (
        <ul className="results">{linkList.map(item => <li>{item}</li>)}</ul>
      ) : (
        <span>Generate some links first...</span>
      )}
    </div>
  );
}

export default App;
