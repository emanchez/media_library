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
    <>
      <Collection>
        {catagories.map((value: iCatagory) => {
          // array of catagories
          return (
            <Catagory key={value.name}>
              <CataLabel id={value.name + "-label"}>
                {value.name.toUpperCase()}
              </CataLabel>
              <SubCatagoryWrap id={value.name + "-sub"}>
                {value.subcatagories.map((subCat) => {
                  return (
                    <SubCatagory key={subCat}>
                      <CataLabel id={subCat + "-label"} inner="inner">
                        {subCat.toUpperCase()}
                      </CataLabel>
                      <MusicWrap id={subCat + "-songs"}>
                        {musicCollection
                          .reduce((result, val) => {
                            if (
                              val.category === value.name &&
                              val.subcat == subCat
                            ) {
                              result.push(val);
                            }
                            return result;
                          }, [] as iSong[]) // array of song metadata
                          .map((songObj) => {
                            var playID = "play-" + songObj.link;
                            var stopID = "stop-" + songObj.link;
                            var vidID = songObj.link + "-player";

                            function handleClick(event: string) {
                              console.log("event fired: " + event);
                              if (event === "play") {
                                document.getElementById(vidID).src +=
                                  "?autoplay=1"!;
                              }
                              if (event === "stop") {
                                document.getElementById(vidID).src =
                                  "https://www.youtube.com/embed/" +
                                  songObj.link!;
                              }
                            }
                            return (
                              //<Link href={songObj.link}>{songObj.title}</Link>
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
                            );
                          })}

                        <br />
                        <AddButton>ADD SONG</AddButton>
                      </MusicWrap>
                    </SubCatagory>
                  );
                })}
                <br />
                <AddButton>ADD SUB CATAGORY</AddButton>
              </SubCatagoryWrap>
            </Catagory>
          );
        })}
        <br />
        <AddButton>ADD CATAGORY</AddButton>
      </Collection>
    </>
  );
};

export default Music;
