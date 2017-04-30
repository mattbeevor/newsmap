import React from 'react'
import {selectArticle,closeWindow, reCentre} from "../actions"
import Result from "./Result"


var Browse = React.createClass({

    shouldComponentUpdate(){
      var tab="this"
      if(this.props.browsetab!==tab){
        tab=this.props.browsetab
        return true
      }else{
        return false
      }
    },

    render() {
      var tab=this.props.browsetab
      var articles=this.props.articles
      var dispatch=this.props.dispatch
      var articlelist="Loading articles..."
      var started=this.props.started
      var k =this.props.k




      function getIndex(tab){
        switch(tab){
          case "top":
            return 0
          case "world":
            return 1
          case "uk":
            return 2
          case "politics":
            return 3
          case "sport":
            return 4
          default:
            return 0
        }
      }
      
      var tabindex=getIndex(tab)

      if(articles[tabindex]!==undefined){
        articlelist=articles[tabindex].map(function(e){
          function startfunction(){
              dispatch(reCentre())
              dispatch(closeWindow())
              dispatch(selectArticle(e,started,k))
          }
          if(e.fields===undefined){
            e.fields={thumbnail:"empty"}
          }
          return <Result onClick={startfunction} thumbnail={e.fields.thumbnail}  key={e.id} webTitle={e.webTitle}/>
        })
      }



      return (
        <div className="reader">{articlelist}</div>
      )
    },

  })

export default Browse
