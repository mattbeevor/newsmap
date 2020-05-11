import React from 'react'


export default class Result extends React.Component {
    
    render() {

      let nointeraction = {
          pointerEvents: "none",
      }

      let blankStyle = {
        height: "90px",
        width: "150px",
        background: "skyblue"
      }

      let thumbnail

      if(this.props.thumbnail===undefined){
        thumbnail=<div style={blankStyle}></div>
      }else{thumbnail=<img width="150" alt="" src={this.props.thumbnail.replace("http:","https:")}/>}

      return (
        <div  onClick={this.props.onClick} className="wrapper">
          <div className="float left">
              {thumbnail}
          </div>
          <div className="float right">
              <p style={nointeraction}>{this.props.webTitle}</p>
          </div>
        </div>
      )
    }
  }