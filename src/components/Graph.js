import React from 'react'
import _ from 'underscore'
import {reCentre, openWindow, dragGraph,startDrag,endDrag} from "../actions"
import Graphnode from "./Graphnode"

var Graph = React.createClass({


  render() {

    var width = window.innerWidth

    var height= window.innerHeight
    var offset = this.props.drag.livetranslation
    var dispatch = this.props.dispatch
    var nodes=this.props.update.nodes
    var links=this.props.update.links
    var nodestopass=this.props.update.nodes
    var linkstopass=this.props.update.links
    var hovernode=this.props.hover.node
    var k=this.props.k
    
    var hovercheck=false


    if( hovernode.id!=="empty" && nodes.length>1){
      hovercheck=true
      var index= nodes.map(function(e){return e.id}).indexOf(hovernode.id)
      var hovlist = [hovernode]
      nodes=nodes.slice(0,index).concat(nodes.slice(index+1,nodes.length)).concat(hovlist)
    }


    nodes = _.map(nodes, (node) => {
      return <Graphnode k={k} random={this.props.random} status={this.props.status}  key={node.id} linkstopass={linkstopass} nodestopass={nodestopass} dispatch={this.props.dispatch} node={node} hovercheck={hovercheck} offset={offset} hovernode={hovernode} isfetching={this.props.isfetching} firstlist={this.props.firstlist}/>
    });

    var linkcolor="coral"
    if(hovernode.clicked===true){
      linkcolor="blue"
    }

    links = _.map(links, (link) => {
      var colour="darkgrey"
      var strokewidth=1.1
      if(hovercheck===true){
        if(hovernode.id==link.sourcekey||hovernode.id==link.targetkey){
            colour=linkcolor
            strokewidth=1.9
        }
      }
      return (
        <line className='link' key={link.key} strokeWidth={strokewidth} stroke={colour}
          x1={link.source.x+offset.x} x2={link.target.x+offset.x} y1={link.source.y+offset.y} y2={link.target.y+offset.y} />
      );
    });


    var xstart=0
    var ystart=0



    function enableDrag(e){
      xstart=e.clientX
      ystart=e.clientY

      dispatch(startDrag(xstart,ystart))
    }

    function finishDrag(e){
      xstart=e.clientX
      ystart=e.clientY
      dispatch(endDrag(xstart,ystart))
    }

    function drags(e){
      dispatch(dragGraph(e.clientX,e.clientY))
    }

    var buttonStyle={
      cursor: "pointer",
      position:"absolute",
      top: "0px",
      left: "0px",
      padding: "1px",
      borderBottomLeftRadius: "5px",
      borderTopRightRadius: "4px",
      width: "25px",
      textAlign: "center",
      color: "#888888",
      userSelect:"none",
      fontSize:"300%"
    }

    function openModal() {
      dispatch(reCentre())
      dispatch(openWindow())
    }


    return (
      <div >
        <div style={buttonStyle} onClick={openModal} className="material-icons menubutton">menu
        </div>
        <svg width={width} height={height}  onMouseUp={finishDrag}  onMouseMove={drags} >
          <rect fill={"white"} width={width} onMouseDown={enableDrag} height={height} />
          <g>
            {links}
            {nodes}
          </g>
        </svg>
      </div>
    );
  }
});

export default Graph
