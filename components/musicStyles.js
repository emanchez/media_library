import styled from "styled-components";

const darkMain = "#333353";
const lightComplement = "LightCyan";

export const Container = styled.div``;

export const VidContainer = styled.div`
  height: 25vh;
  width: 100%;
  background-color: ${lightComplement};
  iframe {
    display: none;
  }
`;

export const Collection = styled.div`
  height: 75vh;
  width: 100%;
  overflow: scroll;
`;
export const Catagory = styled.div`
  padding: 2em;
  background-color: ${darkMain};
`;
export const SubCatagoryWrap = styled.div`
  margin-left: 20px;
`;
export const SubCatagory = styled.div`
  padding: 1em;
  background-color: ${lightComplement};
`;
export const MusicWrap = styled.div`
  margin-left: 30px;
`;

export const Song = styled.div`
  display: flex;
  padding: 0.5em;
  background-color: ${darkMain};
  iframe {
    display: none;
  }
`;

export const CataLabel = styled.label`
  color: ${lightComplement};
  font-size: 32pt;
  font-family: garamond, serif;

  ${({ inner }) =>
    inner &&
    `
      color: ${darkMain};
    font-size:24pt;
  `}

  ${({ mini }) =>
    mini &&
    `
    font-size:12pt;
  `}
`;

export const AddButton = styled.button`
  margin: 0 5px;
  border-radius: 0;
  background-color: #556;
  color: white;
`;
