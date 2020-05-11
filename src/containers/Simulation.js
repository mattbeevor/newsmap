import React from 'react'
import {forceSimulation, forceLink, forceCollide} from "d3-force";
import {updateAnimation, runningSimulation,dragApplied} from "../actions"
import{ store } from "../index";
import Graph from '../components/Graph'

export default class Simulation extends React.Component {
  

  componentWillMount(){
    let dispatch = this.props.dispatch
    let radius=25
    let nodes=[]
    let links=[]
    let force=forceSimulation(nodes)
      .force('collide', forceCollide(radius+45))
      .force("link", forceLink(links).id(function(d){return d.id}))
      .velocityDecay([.9])
      .alphaTarget(0)
      .on("tick", step);

    function step(){
      let state=store.getState()
      if(state.nodeStatus.status==="dragged"){
        let offset=store.getState().graphDrag.simulationoffset
        nodes.forEach(function(n) { n.x += offset.x});
        nodes.forEach(function(n) { n.y += offset.y});
        links=links.map(function (e){return{key:e.key,target:nodes[e.target.index],targetkey:e.targetkey, sourcekey:e.sourcekey, source:nodes[e.source.index]}})
        dispatch(dragApplied())
      }
      if(state.nodeStatus.status==="nodestoadd"){
        let reheat = 0.3
        nodes=state.nodeAdd.nodes
        links=state.nodeAdd.links
        force.nodes(nodes)
        force.force("link").links(links);
        force.alpha(reheat).restart()
      }
      dispatch(updateAnimation(nodes,links))
      if(state.nodeStatus.status!=="running"){
       dispatch(runningSimulation())
      }
    };
      
  }

  render(){

    return (
      <Graph  k={this.props.k} status={this.props.status} update={this.props.update} isOpen={this.props.isOpen} firstlist={this.props.firstlist} dispatch={this.props.dispatch} drag={this.props.drag} hover={this.props.hover} isfetching={this.props.isfetching}>
      </Graph>
    )

  }
}