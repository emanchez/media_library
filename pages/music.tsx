import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import * as catagories from "../data/catagories.json";
import * as musicCollection from "../data/music.json";
import {
  Collection,
  Catagory,
  CataLabel,
  SubCatagory,
  SubCatagoryWrap,
  MusicWrap,
  Song,
  AddButton,
} from "../components/musicStyles";

interface iCatagory {
  name: string;
  subcatagories: string[];
}

interface iSong {
  category: string;
  subcat: string;
  title: string;
  link: string;
}

const Music: NextPage = () => {
  return (
    //RENDER
    <>
      <Collection>
        {catagories.map((value: iCatagory) => {
          // array of catagories
          return (
            // RENDER
            <Catagory key={value.name}>
              <CataLabel id={value.name + "-label"}>
                {value.name.toUpperCase()}
              </CataLabel>
              <SubCatagoryWrap id={value.name + "-sub"}>
                {value.subcatagories.map((subCat: string) => {
                  return (
                    // RENDER
                    <SubCatagory key={subCat}>
                      <CataLabel id={subCat + "-label"} inner="inner">
                        {subCat.toUpperCase()}
                      </CataLabel>
                      <MusicWrap id={subCat + "-songs"}>
                        {musicCollection
                          .reduce((result, val: iSong) => {
                            if (
                              // if song matches catagory and sub catagory of the current div, then render it
                              val.category === value.name &&
                              val.subcat == subCat
                            ) {
                              result.push(val);
                            }
                            return result;
                          }, [] as iSong[]) // array of song metadata
                          .map((songObj) => {
                            // render song div

                            // init ID names for javascript methods
                            var playID = "play-" + songObj.link;
                            var stopID = "stop-" + songObj.link;
                            var vidID = songObj.link + "-player";

                            function handleClick(event: string) {
                              // play/stop method using vanilla javascript
                              console.log("event fired: " + event);
                              if (event === "play") {
                                document.getElementById(vidID).src +=
                                  "?autoplay=1"!; // error message here but i cant prevent it (even with try/catch block)
                              }
                              if (event === "stop") {
                                document.getElementById(vidID).src =
                                  "https://www.youtube.com/embed/" +
                                  songObj.link!; // error message here but i cant prevent it (even with try/catch block)
                              }
                            }
                            return (
                              // RENDER
                              <Song key={songObj.link}>
                                <CataLabel mini id={songObj.link + "-label"}>
                                  {songObj.title}
                                </CataLabel>
                                <div>
                                  <AddButton
                                    id={playID}
                                    onClick={() => handleClick("play")}
                                  >
                                    PLAY
                                  </AddButton>
                                  <AddButton
                                    id={stopID}
                                    onClick={() => handleClick("stop")}
                                  >
                                    STOP
                                  </AddButton>
                                </div>

                                <iframe
                                  id={vidID}
                                  width="560"
                                  height="480"
                                  src={
                                    "https://www.youtube.com/embed/" +
                                    songObj.link
                                  }
                                  frameBorder="0"
                                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                              </Song>
                              // END RENDER
                            );
                          })}

                        <br />
                        <AddButton>ADD SONG</AddButton>
                      </MusicWrap>
                    </SubCatagory>
                    // END RENDER
                  );
                })}
                <br />
                <AddButton>ADD SUB CATAGORY</AddButton>
              </SubCatagoryWrap>
            </Catagory>
            //END RENDER
          );
        })}
        <br />
        <AddButton>ADD CATAGORY</AddButton>
      </Collection>
    </>
    //END RENDER
  );
};

export default Music;

///TODO:
//RENDER ONE IFRAME THAT CHANGES SRC ATTRIBUTE WHEN SONG ONCLICK EVENT FIRES
//MOVE JSON DATA TO DATABASE
//WRITE SERVER API FOR SAID DATABASE
//CREATE FUNCTION TO ADD CATAGORY/SUBCATAGORY/SONGS
//SWAP OUT YOUTUBE LINKS FOR LOCALLY STORED VIDEO/AUDIO FILES
//OFFLOAD MOST STYLED DIVS TO SPEREATE LAYOUT MODULES AKA CLEAN THIS DAMN FILE UP
