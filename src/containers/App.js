import React from 'react'
import { connect } from 'react-redux'
import Window from "../components/Window"
import Simulation from "./Simulation"
import {closeWindow, playAnimation, rK} from "../actions"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TransitionGroup from 'react-addons-transition-group'

class App extends React.Component {
 
  componentWillMount(){
    let dispatch=this.props.dispatch
    dispatch(rK())
  }

  render(){

    let dispatch=this.props.dispatch


    function windowClose() {
      dispatch(playAnimation())
      dispatch(closeWindow())
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(100,100,100, 0.5)'
    }

    let window=null
    let backdrop=null

    if(this.props.isWindowOpen===true){
      window= <Window key="kiosk" width="500" height="500" tab={this.props.tab} articletab={this.props.articletab}
        article={this.props.article} articles={this.props.articles} browsetab={this.props.browsetab} 
        dispatch={this.props.dispatch} k={this.props.k}
        isOpen={this.props.isWindowOpen} search={this.props.search} windowstart={this.props.windowstart} /> 
      backdrop=<div onClick={windowClose} style={backdropStyle}></div>}

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {backdrop}
        </ReactCSSTransitionGroup>
        <TransitionGroup>
          {window}
        </TransitionGroup>
        <Simulation  k={this.props.k}  origNodes={this.props.origNodes} update={this.props.update} status={this.props.status} isOpen={this.props.isWindowOpen} playing={this.props.playing} firstlist={this.props.firstlist}  dispatch={this.props.dispatch} drag={this.props.drag} hover={this.props.hover} isfetching={this.props.isfetching}>
        </Simulation>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let update = state.animationUpdate
  let isWindowOpen = state.popupWindow.isWindowOpen
  let drag = state.graphDrag
  let hover = state.hoverNode
  let tab = state.currentTab.tab
  let browsetab= state.currentTab.browsetab
  let search = state.searchResults.results
  let articles = state.categoryArticles.articles
  let article = state.currentArticle.article
  let articletab=state.articleTab.enabled
  let added=state.nodeAdd.added
  let windowstart=state.windowSource
  let firstlist=state.firstRelated.list
  let status=state.nodeStatus.status
  let origNodes=state.origNodes
  let k=state.fk.k
  return {
    origNodes,
    status,
    update,
    isWindowOpen,
    drag,
    hover,
    tab,
    search,
    browsetab,
    articles,
    article,
    articletab,
    added,
    windowstart,
    firstlist,
    k
  }
}

export default connect(mapStateToProps)(App)