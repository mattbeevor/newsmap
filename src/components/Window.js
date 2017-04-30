import React from 'react'
import _ from 'underscore'
import { closeWindow,createBrowse} from "../actions"
import Tabs from "./Tabs"
import Viewer from "./Viewer"
import TweenMax from "gsap"

var Window = React.createClass({
 
    
    componentWillEnter (callback) {
      var centreX=window.innerWidth/2
      var centreY=window.innerHeight/2
      var windowstart=this.props.windowstart
      const el = this.container;
      TweenMax.fromTo(el, 0.3, {scale:.2, y: windowstart.y-centreY, x:windowstart.x-centreX, opacity: 0}, {scale:1, y: 0, x:0, opacity: 1, onComplete: callback});
    },

    componentWillLeave (callback) {
      var centreX=window.innerWidth/2
      var centreY=window.innerHeight/2
      var windowstart=this.props.windowstart
      const el = this.container;
      TweenMax.fromTo(el, 0.3, {scale:1, y: 0, opacity: 1}, {scale:.2, y: windowstart.y-centreY, x:windowstart.x-centreX, opacity: 0, onComplete: callback});
    },

    render() {
      var dispatch = this.props.dispatch
      function backClick(){
        dispatch(closeWindow())
      }

      function clickWindow(event){
        event.stopPropagation();
      }

      let modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '9999',
        background: 'white',
        borderRadius:"5px",
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        marginLeft: '-' + (this.props.width/2) + 'px',
        marginTop: '-' + (this.props.height/2) + 'px',
        transform: null
      }

      var xStyle={
        cursor: "pointer",
        position:"absolute",
        top: "0px",
        right: "0px",
        background: "coral",
        padding: "1px",
        borderBottomLeftRadius: "5px",
        borderTopRightRadius: "4px",
        width: "25px",
        textAlign: "center",
        color: "white",
        userSelect:"none",
        fontSize:"120%"
      }
      if(this.props.articletab===true){
      var closebutton=<div style={xStyle} onClick={backClick} className="material-icons">close</div>
      }else{closebutton=null}

      return (
        <div style={modalStyle} onClick={clickWindow} ref={c => this.container = c}>
          {closebutton}
          <Tabs browsetab={this.props.browsetab} articletab={this.props.articletab} tab={this.props.tab} dispatch={dispatch}/>
          <Viewer  k={this.props.k}  article={this.props.article} started={this.props.started} articles={this.props.articles} search={this.props.search}  browsetab={this.props.browsetab} tab={this.props.tab} dispatch={dispatch} />
        </div>
      )
    }
  })

export default Window
