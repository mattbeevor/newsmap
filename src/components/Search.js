import React from 'react'
import {selectArticle,submitSearch,closeWindow,reCentre} from "../actions"
import Result from "./Result"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let k =this.props.k
    if(this.state.value.length>0){
      this.props.dispatch(submitSearch(this.state.value,k))
    }
  }

  render() {
    let dispatch = this.props.dispatch
    let search=this.props.search
    let started=this.props.started
    let searchresults=search.map(function(e){
      function startfunction(){
                dispatch(reCentre())
                dispatch(closeWindow())
                dispatch(selectArticle(e,started))
      }
      return <Result thumbnail={e.fields.thumbnail.replace("http:","https:")} onClick={startfunction} key={e.id} webTitle={e.webTitle}/>
    })

    let boxStyle={height:"36px"}
        
    let buttonStyle={
      cursor: "pointer",
      position: "absolute",
      padding: "0",
      border: "none",
      background: "none",
      margin: "0rem",
    height:"25px"}

    return (
      <div>
        <div style={boxStyle}>
        <form onSubmit={this.handleSubmit} className="searchbox">
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" style={buttonStyle} className="material-icons" value="search" />
        </form>
        </div>
        <div className="reader">{searchresults}</div>
      </div>
    );
  }
}

export default Search
