import React from 'react'
import Search from "./Search"
import Browsetabs from "./Browsetabs"
import Browse from "./Browse"
import Article from "./Article"


let Viewer = React.createClass({
    render() {
      if(this.props.tab==="browse"){
        return (
          <div>
            <Browsetabs tab={this.props.tab}  browsetab={this.props.browsetab} dispatch={this.props.dispatch}/>
            <Browse  k={this.props.k} browsetab={this.props.browsetab} started={this.props.started} dispatch={this.props.dispatch} articles={this.props.articles}/>
          </div>
        )
      }
      if(this.props.tab==="article"){
        return (
            <Article  article={this.props.article}/>
        )
      }
      if(this.props.tab==="search"){
        return (
          <Search  k={this.props.k} started={this.props.started} dispatch={this.props.dispatch} search={this.props.search}/>
        )
      }
    }
  })

export default Viewer