import React from 'react'
import {selectArticle,closeWindow, reCentre} from "../actions"
import Result from "./Result"


let Browse = React.createClass({

    shouldComponentUpdate(){
      let tab="this"
      if(this.props.browsetab!==tab){
        tab=this.props.browsetab
        return true
      }else{
        return false
      }
    },

    render() {
      let tab=this.props.browsetab
      let articles=this.props.articles
      let dispatch=this.props.dispatch
      let articlelist="Loading articles..."
      let started=this.props.started
      let k =this.props.k




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
      
      let tabindex=getIndex(tab)

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
          return <Result onClick={startfunction} thumbnail={e.fields.thumbnail.replace("http:","https:")}  key={e.id} webTitle={e.webTitle}/>
        })
      }



      return (
        <div className="reader">{articlelist}</div>
      )
    },

  })

export default Browse
