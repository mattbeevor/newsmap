import React from 'react'

import { changeTab} from "../actions"

var Tabs = React.createClass({

    

    render() {
      var dispatch=this.props.dispatch
      var displaytab=this.props.tab
      var browsetab=this.props.browsetab


      function Browsetab(){dispatch(changeTab("browse",browsetab))}
      function Searchtab(){dispatch(changeTab("search",browsetab))}
      function Articletab(){dispatch(changeTab("article",browsetab))
      }

      switch (displaytab){
        case "browse":
          var background="coral"
          var margin="0%"
          break
        case "search":
          background="skyblue"
          margin="33%"
          break
        case "article":
          background="lightgreen"
          margin="66%"
          break
        default:
          background="coral"
          margin="0%"
      }

      var hrStyle = {
        height: ".25rem",
        width: "33%",
        marginLeft: margin,
        background: background
      }

      var aStyle = {
        cursor: "pointer",        
        textDecoration: "none",
        width: "33%",
        padding: "0rem",
        margin: "0px",
        color: "#333",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }

      var listitems=
        <div>
        <ul>
          <li onClick={Browsetab} className="browse" style={aStyle}>BROWSE</li>
          <li onClick={Searchtab} className="search"style={aStyle}>SEARCH</li>
          <li onClick={Articletab} className="article"style={aStyle}>ARTICLE</li>
          <hr style={hrStyle} />
        </ul>
        </div>
      var articletab=this.props.articletab
      if(articletab===false){
        aStyle.width="50%",
        hrStyle.width="50%"
        hrStyle.marginLeft="0%"
        if(displaytab==="search"){
        hrStyle = {
        height: ".25rem",
        width: "50%",
        marginLeft: "50%",
        background: "skyblue"
        }}
         listitems=
          <div>
            <ul>
              <li onClick={Browsetab} style={aStyle} className="startbrowse">BROWSE</li>
              <li onClick={Searchtab} style={aStyle} className="startsearch">SEARCH</li>
              <hr style={hrStyle} />
            </ul>
          </div>
      }


      return (

        <div className="container">
          {listitems}
        </div>
      )
    },

  })

export default Tabs
