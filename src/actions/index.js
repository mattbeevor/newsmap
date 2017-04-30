import firebase from 'firebase'

export const sendTitle = (node) => ({
  type: "SEND_TITLE",
  node
})

export const firstClicked = () => ({
  type: "FIRST_CLICKED",
})

export const updateData = (json,started) => ({
  type: "UPDATE_DATA",
  json,
  started
})
export const reCentre = () => ({
  type: "RE_CENTRE",
})

export const fromWindow = (node) => ({
  type: "FROM_WINDOW",
  node
})

export const startAnimation = (startnode) => ({
  type: "START_ANIMATION",
  startnode
})

export const reStart = (startnode) => ({
  type: "RE_START",
  startnode
})

export const newAnimation = (node,started) => dispatch => {
  if(started===false){
    dispatch(startAnimation(node))  
  }else{
    dispatch(reStart(node))
  }
}

export const displayText = (article) => ({
  type: "DISPLAY_TEXT",
  article
})

const getText = (node,k) => dispatch => {
  var link = "https://content.guardianapis.com/".concat(String(node.id).concat("?show-fields=body%2Cthumbnail&api-key=".concat(k)))     
  return fetch(link)
    .then(response => response.json())
    .then(json => dispatch(displayText(json)))
}

export const selectNode = (node,k) => dispatch => {
  dispatch(sendTitle(node))
  dispatch(getText(node,k))
  dispatch(fromWindow(node))
}

export const provideCategories=(output) => ({
  type: "PROVIDE_CATEGORIES",
  output,
})


const getCategories = (k) => dispatch => {
  var categories=["uk","world","uk-news","politics","sport"]
  var urls = categories.map(function(category){return "https://content.guardianapis.com/".concat(category.concat("?show-most-viewed=true&show-related=true&show-fields=thumbnail&api-key=".concat(k)))})
  var output=[]
  const grabContent = url => fetch(url)
       .then(response => response.json())
       .then(json => output.push(json.response))
  Promise
    .all(urls.map(grabContent))
    .then(() => dispatch(provideCategories(output)))
} 

export const createBrowse = (k) => dispatch => {
  dispatch(getCategories(k))
}

export const gK = (k) => ({
  type: "G_K",
  k
})




const fK = () => dispatch => {
var config = {
    apiKey: "AIzaSyDXaKa7L0CQPiihINegjQDj4cliw1O2YC8",
    authDomain: "newsapp-2b222.firebaseapp.com",
    databaseURL: "https://newsapp-2b222.firebaseio.com",
    projectId: "newsapp-2b222",
    storageBucket: "newsapp-2b222.appspot.com",
    messagingSenderId: "774276050231"
};
firebase.initializeApp(config);
var database=firebase.database()
var ref = database.ref();
ref.on('value', function(snapshot) {snapshot.forEach(function(childSnapshot) {
      var k = childSnapshot.val();
      dispatch(gK(k))
      dispatch(createBrowse(k))
    });
});
} 

export const rK = () => dispatch => {
  dispatch(fK())
}




const initialStory = (searchitem,started,k) => dispatch => {
  var link = "https://content.guardianapis.com/".concat(String(searchitem.id).concat("?show-related=true&show-fields=thumbnail&api-key=".concat(k)))     
  return fetch(link)
    .then(response => response.json())
    .then(json => dispatch(updateData(json,started)))
}

export const selectArticle = (searchitem,started,k) => dispatch => {
  dispatch(startAnimation(searchitem))
  dispatch(initialStory(searchitem,started,k))
  dispatch(reCentre())
}

export const runningSimulation = () => ({
  type: "RUNNING_SIMULATION",
})

export const dragApplied = () => ({
  type: "DRAG_APPLIED",
})

export const unStart = () => ({
  type: "UN_START",
})

export const receivedResults = (json) => ({
  type: "RECEIVED_RESULTS",
  json
})

const doSearch = (searchterm,k) => dispatch => {
  var link = "https://content.guardianapis.com/search?q=".concat(searchterm).concat("&show-fields=thumbnail&api-key=".concat(k))
  return fetch(link)
    .then(response => response.json())
    .then(json => dispatch(receivedResults(json)))
}

export const submitSearch = (searchterm,k) => dispatch => {
  dispatch(doSearch(searchterm,k))
}

export const changeTab = (tab,browsetab) => ({
  type: "CHANGE_TAB",
  tab,
  browsetab
})

export const stopHover = () => ({
  type: "STOP_HOVER",
})

export const hoverNode = (node) => ({
  type: "HOVER_NODE",
  node
})

export const pauseAnimation = () => ({
  type: "PAUSE_ANIMATION"
})

export const playAnimation = () => ({
  type: "PLAY_ANIMATION"
})

export const startDrag = (posx,posy) => ({
  type: "START_DRAG",
  posx,
  posy
})

export const endDrag = (posx,posy) => ({
  type: "END_DRAG",
  posx,
  posy
})

export const dragGraph = (posx,posy) => ({
  type: "DRAG_GRAPH",
  posx,
  posy
})

export const closeWindow = () => ({
  type: "CLOSE_WINDOW"
})

export const openWindow = () => ({
  type: "OPEN_WINDOW"
})

export const addNode = (node, nodes, links, output) => ({
  type: "ADD_NODE",
  node,
  nodes,
  links,
  output,
})

export const receivedRelated = (output,node,nodes,links) =>  dispatch => {
  dispatch(addNode(node, nodes, links, output))
}

const requestRelated = (node, nodes, links, k ) => dispatch => {
  var urls=node.relatedarticles
  urls = urls.map(function(url){return "https://content.guardianapis.com/".concat(url.concat("?show-related=true&show-fields=thumbnail&api-key=".concat(k)))     
 })
  var output=[]
  const grabContent = url => fetch(url)
       .then(response => response.json())
       .then(json => output.push(json.response))
  Promise
    .all(urls.map(grabContent))
    .then(() => dispatch(receivedRelated(output,node,nodes,links)))
}

export const clickCircle = (node, nodes, links,k ) => dispatch => {
  dispatch(requestRelated(node, nodes, links,k ))
}

export const updateAnimation = (nodes,links) => ({
  type: "UPDATE_ANIMATION",
  nodes,
  links
})