import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [media, setMedia] = useState("music");
  const [favorites, setFavorites] = useState([]);

  const handleChange = (evt) => {
    setMedia(evt.target.value);
    console.log(media);
  };

  const look = () => {
    axios
      .get(`/api/${search}/${media}`)
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        setTracks(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const addtofavorites = (evt) => {
    //  console.log(evt.target.attributes.getNamedItem('dataSet').value)
    let record = evt.target.attributes.getNamedItem("dataSet").value;
    //console.log(JSON.parse(record).trackId)

    if (localStorage.getItem("myfavourites") === null) {
      localStorage["myfavourites"] = JSON.stringify([record]);
    } else {
      let fav = JSON.parse(localStorage["myfavourites"]);
      console.log(typeof fav);
      fav.push(record);
      localStorage["myfavourites"] = JSON.stringify(fav);
    }
    favorites.push(record);
    setFavorites(favorites);
    // window.location.reload();
    alert("Added to favourite");
    look();
  };
  const ifFav = (record) => {
    if (localStorage.getItem("myfavourites") !== null) {
      let trackId = record.trackId;
      let fav = localStorage.getItem("myfavourites");
      fav = JSON.parse(fav);
      console.log(trackId);
      /*
/here I am checking that if the trackId of the record is present in the list of my favourites, if it is present , we return true else we return false
*/
      let arr = fav.filter((x) => {
        //  console.log(JSON.parse(x).trackId+" "+ trackId);
        //  console.log(x.trackId+" "+typeof(trackId))
        let result = String(JSON.parse(x).trackId)
          .trim()
          .localeCompare(
            String(trackId)
          ); /*Here we are comparing two string trackid's and then returning true if result is 0 */
        console.log(result);
        return result === 0;
      });
      console.log(arr.length);
      let r = arr.length > 0;
      console.log(r);
      return r;
    }
    return false;
  };

  return (
    <div className="main">
      <input
        className="inp-field"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
      <select name="choice" onChange={handleChange} className="inp-field">
        <option value="music" onChange={handleChange} name="choice">
          Music
        </option>
        <option value="movie" onChange={handleChange} name="choice">
          movie
        </option>
        <option value="musicVideo" onChange={handleChange} name="choice">
          musicVideo
        </option>
        <option value="podcast" onChange={handleChange} name="choice">
          Podcast
        </option>
        <option value="audiobook" onChange={handleChange} name="choice">
          audiobook
        </option>
        <option value="shortFilm" onChange={handleChange} name="choice">
          shortFilm
        </option>
        <option value="tvShow" onChange={handleChange} name="choice">
          tvShow
        </option>
        <option value="software" onChange={handleChange} name="choice">
          software
        </option>
        <option value="all" onChange={handleChange} name="choice">
          all
        </option>
      </select>

      <input
        className="inp-field btn"
        type="button"
        value="Search"
        onClick={look}
      />

      <table className="center">
        <tbody>
          {tracks.length===0? '' :   <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
}
        
          {tracks.map((record) => {
            return (
              <tr key={record.trackId}>
                <td>{record.artistName}</td>
                <td>{record.collectionName}</td>
                <td>{record.collectionPrice}</td>
                <td>
                  <input
                  className="btn"
                    type="button"
                    value={
                      ifFav(record) ? "Added To Favourite" : "Add to Favourite"
                    }
                    dataSet={JSON.stringify(record)}
                    onClick={addtofavorites}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
