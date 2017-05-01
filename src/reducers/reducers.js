const windowSource=(state={x:Math.floor(window.innerWidth/2),y:Math.floor(window.innerHeight/2)},action) =>{
  switch (action.type){
    case "RE_CENTRE":
      var width=window.innerWidth
      var height=window.innerHeight
      var centre={x:Math.floor(width/2),y:Math.floor(height/2)}
      return {x:centre.x,y:centre.y}
    case "FROM_WINDOW":
      return {x:action.node.x,y:action.node.y}
    default:
      return state
  } 
}

const currentArticle=(state={article:{webTitle:"none",webPublicationDate:"none",fields:{thumbnail:"h.h",bodyText:"none"}}},action) => {
  switch (action.type){
    case "SEND_TITLE":
      return {article:{webPublicationDate:action.node.webPublicationDate, webTitle:action.node.webTitle,fields:{thumbnail:action.node.thumbnail,bodyText:""}}}
    case "DISPLAY_TEXT":
      return {article:action.article.response.content}
    default:
      return state
  }
}

const searchResults=(state={results:[]},action) => {
  switch (action.type){
    case "RECEIVED_RESULTS":
      var results=action.json.response.results
      results.forEach(function(n) { if(n.fields===undefined){n.fields={thumbnail:"empty"}}});
      return {results:results}
    default:
      return state
  }
}


const animationUpdate = (state = {links: [], nodes: []}, action) => {
  switch (action.type) {
    case "UPDATE_ANIMATION":
     return {links: [].concat(action.links), nodes: [].concat(action.nodes)}
    default:
      return state
  }
}



const popupWindow = (state = {isWindowOpen:true}, action) => {
  switch (action.type) {
    case "OPEN_WINDOW":
      return {isWindowOpen:true}
    case "CLOSE_WINDOW":
      return {isWindowOpen:false}
    default:
      return state
  }
}

const firstRelated = (state = {list:"notready"}, action) => {
  switch (action.type){
    case "UPDATE_DATA":
      var relatedarticles=action.json.response.relatedContent.map(function(item){return item.id})
      return {list:relatedarticles}
    default:
      return state
  }
}

const firstClick=(state={clicked:false},action) =>{
  switch(action.type){
    case "FIRST_CLICKED":
      return {clicked:true}
    default:
      return state
  }
}

const hoverNode = (state={node:{id:"empty"}}, action) => {
   switch (action.type){
    case "HOVER_NODE":
      return {node:action.node}
    case "STOP_HOVER":
      return {node:{id:"empty"}}
    default:
      return state
   }
}

module.exports = {
windowSource: windowSource,
currentArticle: currentArticle,
searchResults: searchResults,
animationUpdate: animationUpdate,
popupWindow: popupWindow,
firstRelated: firstRelated,
firstClick: firstClick,
hoverNode: hoverNode,
}