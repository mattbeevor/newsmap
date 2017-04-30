import React from 'react'


var Article = React.createClass({
    render() {
      var article=this.props.article
      var image=null
      var body =""
      var date=null
      var boxStyle={minHeight:"36px", paddingBottom: "4px",textAlign: "center"}

      if(article.fields !== undefined){
        if(article.fields.thumbnail !== undefined && article.fields.thumbnail !== "none" ){
          var thumbnail=article.fields.thumbnail
          image =<img width="470" src={thumbnail} alt=""/>
        }
        if(article.fields.body !== undefined){
          body=article.fields.body
        }
      }

      if(article.webPublicationDate !== undefined){
        date=article.webPublicationDate
        date=new Date(date.slice(0,4),parseInt(date.slice(5,7),10)-1,date.slice(8,10))
        date = date.toDateString()
      }


      function cleanArticle(article){
        var text=article
        while(text.search(/<figure/i)!==-1){
          text=text.slice(0,text.search(/<figure/i)).concat(text.slice(text.search(/<\/figure>/i)+9,text.length))
        }
        while(text.search(/<aside/i)!==-1){
          text=text.slice(0,text.search(/<aside/i)).concat(text.slice(text.search(/<\/aside>/i)+8,text.length))
        }
        return text
      }

      var articletext=cleanArticle(body)
      function createMarkup() { return {__html: articletext}; };
      
      return (
        <div className="articlereader">
          <div style={boxStyle}>
          <h1>{article.webTitle}</h1>
          <p>{date}</p>
          </div>
          {image}
          <div dangerouslySetInnerHTML={createMarkup()}>
          </div>
        </div>
      )
    },
  })

export default Article
