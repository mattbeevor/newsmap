import React from 'react'


var Result = React.createClass({
    
    render() {

      var nointeraction = {
          pointerEvents: "none",
      }

      var blankStyle = {
        height: "90px",
        width: "150px",
        background: "skyblue"
      }

      if(this.props.thumbnail===undefined){
        var thumbnail=<div style={blankStyle}></div>
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
  })

export default Result
