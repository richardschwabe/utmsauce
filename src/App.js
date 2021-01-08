import React, { useState } from "react";

import "foundation-sites/dist/css/foundation.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dateFormat from "dateformat";

import PlaceSelector from "./components/PlaceSelector/PlaceSelector";
import Copyright from "./components/Copyright/Copyright";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [url, setUrl] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [places, setPlaces] = useState({});

  const [linkList, setLinkList] = useState([]);

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

    console.log("Original places", places);
    let addedPlaces = Object.keys(places).filter((i) => places[i] === 1);

    console.log(addedPlaces);

    let utmStartChar = "?";
    if (url.indexOf("?") > -1) {
      utmStartChar = "&";
    }

    let newLinkList = [];
    let urlUTMCampaignPart = `${utmStartChar}utm_campaign=${campaignIdentifierDateString}-${campaignName}`;

    let urls = [];
    addedPlaces.map((i) => {
      let splittedItem = i.split("-");
      let urlUTMSource = splittedItem[0];
      let urlUTMMedium = splittedItem[1];
      let finalUrl = `${urlUTMCampaignPart}&utm_source=${urlUTMSource}&utm_medium=${urlUTMMedium}`;
      urls.push(url + finalUrl);
    });
    setLinkList(urls);
  };

  const toggleSourceMedium = (value) => {
    const newPlaces = { ...places };
    if (value in newPlaces) {
      newPlaces[value] = 0;
    } else {
      newPlaces[value] = 1;
    }
    setPlaces(newPlaces);
  };

  return (
    <div className="grid-container">
      <h1>URL</h1>
      <p>Enter URL you want users to visit.</p>
      <div className="ui input fluid">
        <input
          onChange={handleUrlChange}
          value={url}
          type="text"
          placeholder="URL...."
        />
      </div>

      <h2>What is the campaign name?</h2>
      <p>Enter the campaign name that you want to use for tracking.</p>
      <div className="cell small-12 ">
        <input
          type="text"
          placeholder="Campaign Name"
          value={campaignName}
          onChange={handleCampaignChange}
        />
      </div>

      <h2>When will this campaign run?</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      <h2>Choose Campaign Source & Medium</h2>
      <p>
        Choose any of the source mediums, the links will automatically hold the
        source and medium settings according to your selection.
      </p>

      <div className="grid-x grid-margin-x">
        <PlaceSelector toggleItem={toggleSourceMedium} />
      </div>

      <button className="success button expanded large" onClick={generateLinks}>
        Generate
      </button>

      <h2>Results</h2>
      {linkList.length > 0 ? (
        <ul className="results">
          {linkList.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      ) : (
        <span>Generate some links first...</span>
      )}

      <Copyright />
    </div>
  );
}

export default App;
