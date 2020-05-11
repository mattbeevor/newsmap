import React from 'react'
import _ from 'underscore'
import {reCentre, openWindow, dragGraph,startDrag,endDrag} from "../actions"
import Graphnode from "./Graphnode"

export default class Graph extends React.Component {


  render() {

    let width = window.innerWidth

    let height= window.innerHeight
    let offset = this.props.drag.livetranslation
    let dispatch = this.props.dispatch
    let nodes=this.props.update.nodes
    let links=this.props.update.links
    let nodestopass=this.props.update.nodes
    let linkstopass=this.props.update.links
    let hovernode=this.props.hover.node
    let k=this.props.k
    
    let hovercheck=false


    if( hovernode.id!=="empty" && nodes.length>1){
      hovercheck=true
      let index= nodes.map(function(e){return e.id}).indexOf(hovernode.id)
      let hovlist = [hovernode]
      nodes=nodes.slice(0,index).concat(nodes.slice(index+1,nodes.length)).concat(hovlist)
    }


    nodes = _.map(nodes, (node) => {
      return <Graphnode k={k} status={this.props.status}  key={node.id} linkstopass={linkstopass} nodestopass={nodestopass} dispatch={this.props.dispatch} node={node} hovercheck={hovercheck} offset={offset} hovernode={hovernode} isfetching={this.props.isfetching} firstlist={this.props.firstlist}/>
    });

    let linkcolor="coral"
    if(hovernode.clicked===true){
      linkcolor="blue"
    }

    links = _.map(links, (link) => {
      let colour="darkgrey"
      let strokewidth=1.1
      if(hovercheck===true){
        if(hovernode.id===link.sourcekey||hovernode.id===link.targetkey){
            colour=linkcolor
            strokewidth=1.9
        }
      }
      return (
        <line className='link' key={link.key} strokeWidth={strokewidth} stroke={colour}
          x1={link.source.x+offset.x} x2={link.target.x+offset.x} y1={link.source.y+offset.y} y2={link.target.y+offset.y} />
      );
    });


    let xstart=0
    let ystart=0



    function enableDrag(e){
      xstart=e.clientX
      ystart=e.clientY

      dispatch(startDrag(xstart,ystart))
    }

    function finishDrag(e){
      console.log("finishDrag")
      xstart=e.clientX
      ystart=e.clientY
      dispatch(endDrag(xstart,ystart))
    }

    function drags(e){
      dispatch(dragGraph(e.clientX,e.clientY))
    }

    let buttonStyle={
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
}
