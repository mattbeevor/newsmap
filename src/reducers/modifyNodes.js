function linkkey(a,b){
  if(a===b){
    return false
  }else{
    if(parseInt(a,10)>parseInt(b,10)){
      return (a+"--"+b)
    }else{
      return(b+"--"+a)
    }
  }
}

function clicked(rt, nodes){
  var ind = nodes.map(function(e){return e.key}).indexOf(rt.key)
  nodes[ind].colour="black"
  nodes[ind].age=0
  return nodes
}

function addnode(rt, nodes,links,post){
  var currentNodeposition = nodes.map(function(e) { return e.id; }).indexOf(post.id)
  if(currentNodeposition===-1){
    var newnode=[{clicked: false, age:0, x:rt.x, y:rt.y, vx:1, vy:1, relatedarticles:post.relatedarticles, key:post.id, thumbnail:post.thumbnail,lines:post.lines,id:post.id,colour:post.colour }]
    nodes=nodes.concat(newnode)
    var newlink = [{source: rt, target: newnode[0], sourcekey:rt.key, targetkey:newnode[0].key, key: linkkey(rt.key,newnode[0].key) }]
    var newlinks = links.concat(newlink);
    post.relatedarticles.forEach(function(relatedpost){
      var relatedNodeposition=nodes.map(function(e){ return e.key}).indexOf(relatedpost)
      if(relatedNodeposition!==-1){
        var targetnode=nodes[relatedNodeposition]
        targetnode.age=0
        var sourcenode=newnode[0]
        var nkey=linkkey(sourcenode.key,targetnode.key)
        if(newlinks.map(function(e){return e.key}).indexOf(nkey)===-1){
          var newlnk = [{source: sourcenode, target: targetnode, key: nkey, sourcekey:sourcenode.key, targetkey:targetnode.key}]
          newlinks=newlinks.concat(newlnk);
        }
      }
    })
  }else{
    newlinks=links
  }
  return ({nodes:nodes,links:newlinks})
}

var ind=1

function textWidth(text) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  ctx.font = "12px helvetica";
  return ctx.measureText(text).width;
}

function justifytitle(posts){
  var maxlengths=[50,80,85,90,85,80,50]
  var post=posts.content
  var currentline=0
  var currentsection=""
  var lines=["","","","","","",""]
  var colour="yellow"
  var thumbnail="none"
  if(post.fields !== undefined){
    if(post.fields.thumbnail !== undefined){
      thumbnail=post.fields.thumbnail.replace("http:","https:")
    }
  }
  var id=post.id
  var words=post.webTitle.split(" ")
  for (var i = 0; i < words.length; i++) { 
    var word=words[i]
    if(textWidth(currentsection+" "+word)<maxlengths[currentline]||i===0){
      currentsection=currentsection+" "+word
    }else{
      lines[currentline]=currentsection
      currentline+=1
      currentsection=word
    }
  }
  ind+=1
  var webTitle=post.webTitle
  var webPublicationDate=post.webPublicationDate
  var relatedarticles=posts.relatedContent
  relatedarticles=relatedarticles.map(function(item){return item.id})
  return {webPublicationDate:webPublicationDate,thumbnail:thumbnail,key:ind, webTitle:webTitle, lines:lines,id:id,colour:colour,relatedarticles:relatedarticles}

}

function justify(json){
  return json.map(function(e) { return justifytitle(e); })
}

var width=window.innerWidth
var height=window.innerHeight
var centre={x:Math.floor(width/2),y:Math.floor(height/2)}

var dragging=false
var origin={x:0,y:0}
var simulationoffset = {x:0,y:0}

const graphDrag = (state = {livetranslation:{x:0,y:0},simulationoffset:{x:0,y:0}},action) => {

  var livetranslation = {x:0,y:0}
  switch (action.type){
    case "DRAG_APPLIED":
      livetranslation={x:0,y:0}
      simulationoffset={x:0,y:0}
      return {livetranslation:{x:0,y:0},simulationoffset:{x:0,y:0}}
    case "START_DRAG":
      dragging=true
      origin.x=action.posx
      origin.y=action.posy
      simulationoffset={x:0,y:0}
      return {livetranslation:{x:0,y:0},simulationoffset:{x:0,y:0}}
    case "END_DRAG":
      if(dragging===true){
        dragging=false
        livetranslation={x:0,y:0}
        return {livetranslation:simulationoffset,simulationoffset:simulationoffset}
      }else{
        return {livetranslation:{x:0,y:0},simulationoffset:{x:0,y:0}}
      }
    case "DRAG_GRAPH":
      if(dragging===true){
        livetranslation.x=action.posx-origin.x
        livetranslation.y=action.posy-origin.y
        simulationoffset=livetranslation
      }
      return {livetranslation:livetranslation,simulationoffset:simulationoffset}
    default:
      return state
  }
}


function cullOld(nodes,links){
  var retained=[]
  nodes.forEach(function(e){
    if(e.age<4){
      retained=retained.concat(e)
    }
  })
  var nodekeylist=retained.map(function(e){return e.id})
  var retainedlinks=[]
  links.forEach(function(link){
    if(nodekeylist.indexOf(link.sourcekey)!==-1&&nodekeylist.indexOf(link.targetkey)!==-1){
      retainedlinks=retainedlinks.concat(link)
    }
  })


  return {nodes:retained, links:retainedlinks}
}

var lastnode="none"

const nodeAdd = (state =  { nodes: ["empty"], links: [], node:{x:0,y:0},added:true}, action) => {
  let justified,newnode
  switch (action.type) {
    case "START_ANIMATION":
      let startnode={relatedContent:[], content:{id:action.startnode.id, webTitle:action.startnode.webTitle, fields:action.startnode.fields}}
      justified = justify([startnode])
      let post = justified[0]
      newnode={clicked: false, age:0, x:centre.x, y:centre.y, vx:0, vy:0, relatedarticles:"firstnode",key:post.id, thumbnail:post.thumbnail,lines:post.lines,id:post.id,colour:post.colour }
      return {nodes:[newnode], links:[]}
    case "RE_START":
      lastnode="none"
      justified =justify([action.startnode.response])
      post = justified[0]
      newnode={clicked: false, age:0, x:centre.x, y:centre.y, vx:0, vy:0,webTitle:post.webTitle, relatedarticles:post.relatedarticles, key:post.id, thumbnail:post.thumbnail,lines:post.lines,id:post.id,colour:post.colour }
      return {nodes: [].concat(newnode), links: []}
    case "ADD_NODE":
      let thisnode=action.node.id
      if(thisnode!==lastnode){
        lastnode=thisnode
        let output=action.output
        justified =justify(output)
        let nodes=clicked(action.node,action.nodes)
        if(justified.length>0){
          nodes.forEach(function(n) { n.age += 1});
        }
        let links=action.links
        let added=[]
        for(let i=0;i<justified.length;i++){
          added=addnode(action.node, nodes, links, justified[i])
          nodes=added.nodes
          links=added.links
        }
        let rootindex = nodes.map(function(e) { return e.id; }).indexOf(action.node.id)
        nodes[rootindex].clicked=true
        if(justified.length>0){
          var culled=cullOld(nodes,links)
          nodes=culled.nodes
          links=culled.links
        }
        return {added: true, nodes: culled.nodes, links:culled.links}
      }
      break
    default:
      return state
  }
}


const nodeStatus = (state = {status:"windowclosed"},action) => {
  switch (action.type){
    case "START_DRAG":
      return {status:"dragging"}
    case "END_DRAG":
      return {status:"dragged"}
    case "ADD_NODE":
      return {status:"nodestoadd"}
    case "START_ANIMATION":
      return {status:"nodestoadd"}
    case "RE_START":
      return {status:"nodestoadd"}
    case "OPEN_WINDOW":
      return {status:"windowopen"}
    case "CLOSE_WINDOW":
      return {status:"windowclosed"}
    case "RUNNING_SIMULATION":
      return {status:"running"}
    default:
      return state
  }
}

module.exports = {
graphDrag,nodeStatus,nodeAdd,
}