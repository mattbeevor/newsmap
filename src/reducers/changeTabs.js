const currentTab=(state={tab:"browse",browsetab:"top"},action) => {
  switch (action.type){
    case "CHANGE_TAB":
      if(action.level==="browse"){
        return {tab:"browse", browsetab:action.tab}
      }else{
        return {tab:action.tab, browsetab:action.browsetab}
      }
    default:
      return state
  }
}


const articleTab=(state={enabled:false},action) => {
  switch (action.type){
    case "CHANGE_TAB":
      if(action.tab==="article"){
        var enabled=true
        return{enabled:enabled}
      }else{
        return state
      }
      
    default:
      return state
  }
}


module.exports = {
articleTab: articleTab,
currentTab: currentTab,
}