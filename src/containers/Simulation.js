import React from 'react'
import {forceSimulation} from "d3-force";
import {forceY} from "d3-force";
import {forceLink} from "d3-force";
import {forceCollide} from "d3-force";
import {timer} from "d3";
import {updateAnimation, runningSimulation,dragApplied} from "../actions"
import{ store } from "../index";
import Graph from '../components/Graph'

var Simulation = React.createClass({
  
  componentWillMount(){
    var dispatch = this.props.dispatch
    var height= 500
    var radius=25

    if((true||this.props.status==="nodestoadd"||this.props.status==="dragged")){
      function step(){
        var state=store.getState()
        var nodes=state.animationUpdate.nodes
        var links=state.animationUpdate.links
        if(state.nodeStatus.status==="dragged"){
          var offset=store.getState().graphDrag.simulationoffset
          nodes.forEach(function(n) { n.x += offset.x});
          nodes.forEach(function(n) { n.y += offset.y});
          links=links.map(function (e){return{key:e.key,target:nodes[e.target.index],targetkey:e.targetkey, sourcekey:e.sourcekey, source:nodes[e.source.index]}})
          dispatch(dragApplied())
        }
        if(state.nodeStatus.status==="nodestoadd"){
          var reheat = 0.3
          nodes=state.nodeAdd.nodes
          links=state.nodeAdd.links
          var force = forceSimulation(nodes)
            .force('collide', forceCollide(radius+45))
            .force('y', forceY(Math.floor(height/2)))
            .force("link", forceLink(links).id(function(d){return d.id}))
            .velocityDecay([.9])
            .alphaTarget(0)
        force.alpha(reheat).restart()
      }
        dispatch(updateAnimation(nodes,links))
        if(state.nodeStatus.status!=="running"){
          dispatch(runningSimulation())
        }
      };
      timer(step)
    }


  },

  render(){

    return (
      <Graph  k={this.props.k} status={this.props.status} update={this.props.update} isOpen={this.props.isOpen} firstlist={this.props.firstlist} dispatch={this.props.dispatch} drag={this.props.drag} hover={this.props.hover} isfetching={this.props.isfetching}>
      </Graph>
    )

  },
})

export default Simulation
