import React from 'react'
import {firstClicked,changeTab,selectNode,openWindow, clickCircle,pauseAnimation,hoverNode,stopHover} from "../actions"


var Nodedetail = React.createClass({

    shouldComponentUpdate(){
      if(this.props.hovernode.id===this.props.node.id||this.props.status==="nodestoadd"){
        return true
      }else{
        return false
      }
    },

    render() {
      var radius=55
      var node=this.props.node
      var hovernode=this.props.hovernode
      var dispatch=this.props.dispatch
      var linkstopass=this.props.linkstopass
      var nodestopass=this.props.nodestopass
      var elevation=-1.5
      var k =this.props.k

      if(node.clicked===true){
        elevation=0
      }

      var ageshade="1"
      if(node.age===3){
        ageshade="0.65"
      }

      if(hovernode.id===node.id){
        ageshade=1
        if(node.clicked===false){
          elevation=0
        }else{
          elevation=1.5
        }
      }

      var lines=node.lines
      var patid="url(#Pattern"+String(node.key)+")"
      var firstlist=this.props.firstlist

      function clickFunction(){
        if(node.clicked===true){
          dispatch(selectNode(node,k))
          dispatch(openWindow())
          dispatch(pauseAnimation())
          dispatch(changeTab("article","main"))
        }else{
          if(node.relatedarticles==="firstnode"){
            if(firstlist!=="notready"){
              node.relatedarticles=firstlist
              dispatch(clickCircle(node,nodestopass,linkstopass,k))
            }else{
              dispatch(firstClicked())
            }
          }else{
            dispatch(clickCircle(node,nodestopass,linkstopass,k))
          }
        }
      }

      function hoverFunction(){dispatch(hoverNode(node))}
      function unhoverFunction(){dispatch(stopHover())}

      var imagelink=node.thumbnail.replace("http:","https:")
      this.image=null
      if(imagelink!=="none"){
        this.image=<image href={imagelink} height={radius*2} width={radius*3.31} ></image>
        var filler = <pattern id={"Pattern"+String(node.key)} width="1" height="1" >
        {this.image}
	      </pattern>
      }else{
        patid="lightgrey"
      }



      return (
            <g onClick={clickFunction} onMouseOut={unhoverFunction} onMouseOver={hoverFunction}>
              {filler}
              <circle r={radius} cx="2" cy="2"  fill="#000000" fillOpacity="0.3"/>
              <circle r={radius} cx={elevation} cy={elevation} fill={patid} shapeRendering="optimizeQuality" fillOpacity={ageshade} />
              <foreignObject x={-75+elevation} y={-radius+elevation} width="150" height={-5+radius*2}>
                <div key="lines" className="nodediv" width="150" height="100">
                  {lines[0]}<br/>
                  {lines[1]}<br/>
                  {lines[2]}<br/>
                  {lines[3]}<br/>
                  {lines[4]}<br/>
                  {lines[5]}<br/>
                  {lines[6]}<br/>
                </div>
              </foreignObject>
            </g>
      );
    },

  })

export default Nodedetail
