import React from 'react'
import {changeTab} from "../actions"

export default class Browsetabs extends React.Component {

    render() {

      let displaytab=this.props.browsetab
      let dispatch=this.props.dispatch

      function tabChange(browsetab){
        dispatch(changeTab("browse",browsetab))
      }

      function Toptab(){tabChange("top")}
      function Worldtab(){tabChange("world")}
      function Uktab(){tabChange("uk")}
      function Politicstab(){tabChange("politics")}
      function Sporttab(){tabChange("sport")}

      let background="coral"
      let margin="0%"

      switch (displaytab){
        case "top":
          background="coral"
          margin="0%"
          break
        case "world":
          background="skyblue"
          margin="20%"
          break
        case "uk":
          background="lightgreen"
          margin="40%"
          break
        case "politics":
          background="yellow"
          margin="60%"
          break
        case "sport":
          background="lightpink"
          margin="80%"
          break
        default:
          background="coral"
          margin="0%"
      }

      let hrStyle = {
        height: ".25rem",
        width: "20%",
        marginLeft: margin,
        background: background
      }

      let aStyle = {
        cursor: "pointer",
        textAlign: "center",    
        textDecoration: "none",
        width: "20%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        margin: "0",
        color: "#333"
      }

      return (

        <div className="container">
          <ul>
            <li onClick={Toptab} style={aStyle}  className="top">Top</li>
            <li onClick={Worldtab} style={aStyle} className="world">World</li>
            <li onClick={Uktab} style={aStyle} className="uk">UK</li>
            <li onClick={Politicstab} style={aStyle} className="politics">Politics</li>
            <li onClick={Sporttab} style={aStyle}  className="sport">Sport</li>
            <hr style={hrStyle} />
          </ul>
        </div>
      )
    }
  }
