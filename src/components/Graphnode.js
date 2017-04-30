import React from 'react'
import {firstClicked,changeTab,selectNode,openWindow, clickCircle,pauseAnimation,hoverNode,stopHover} from "../actions"
import Nodedetail from "./Nodedetail"



var Graphnode = React.createClass({

    shouldComponentUpdate(){
      return true
    },


    render() {  

      var radius=55
      var node=this.props.node
      var hovernode=this.props.hovernode
      var offset=this.props.offset
      var dispatch=this.props.dispatch
      var linkstopass=this.props.linkstopass
      var nodestopass=this.props.nodestopass
      var k =this.props.k


      if(hovernode.id===node.id){
        if(node.clicked===true){
          radius+=2
        }
      }

      var transformx = node.x + offset.x
      var transformy = node.y + offset.y
		  var transform = 'translate(' + transformx + ',' + transformy + ')';
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




      return (
          <g transform={transform} className='node' key={node.key}>
            <Nodedetail k={k} transform={transform} status={this.props.status}  dispatch={this.props.dispatch} node={node} linkstopass={this.props.linkstopass} var nodestopass={this.props.nodestopass} hovercheck={this.props.hovercheck} hovernode={hovernode} isfetching={this.props.isfetching} firstlist={this.props.firstlist}/>         
         </g>
      );
    },

  })

export default Graphnode
