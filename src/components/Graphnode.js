import React from 'react'
import Nodedetail from "./Nodedetail"

export default class Graphnode extends React.Component {

    render() {  

      let node=this.props.node
      let hovernode=this.props.hovernode
      let offset=this.props.offset
   
      let k =this.props.k

      let transformx = node.x + offset.x
      let transformy = node.y + offset.y
		  let transform = 'translate(' + transformx + ',' + transformy + ')';


      return (
          <g transform={transform} className='node' key={node.key}>
            <Nodedetail k={k} transform={transform} status={this.props.status}  dispatch={this.props.dispatch} node={node} linkstopass={this.props.linkstopass} let nodestopass={this.props.nodestopass} hovercheck={this.props.hovercheck} hovernode={hovernode} isfetching={this.props.isfetching} firstlist={this.props.firstlist}/>         
         </g>
      );
    }

  }
