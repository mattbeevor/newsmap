



const fk = (state= {k:0},action)=>{
  switch (action.type){
    case "G_K":
      return {k:action.k}
    default:
      return state
  }
}

const categoryArticles = (state= {articles:{},k:0},action)=>{
  switch (action.type){
    case "PROVIDE_CATEGORIES":
      var order=action.output.map(function(e){if(e.edition !== undefined){return e.edition.id}else{return "top"}})
      var output=action.output.map(function(e){return e.mostViewed})
      return {articles:[output[order.indexOf("top")],output[order.indexOf("world")],output[order.indexOf("uk-news")],output[order.indexOf("politics")],output[order.indexOf("sport")]]}
    default:
      return state
  }
}

module.exports = {
fk:fk,
 categoryArticles:categoryArticles,
}