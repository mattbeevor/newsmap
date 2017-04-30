import { combineReducers } from 'redux'
import {categoryArticles, fk} from "./categoryArticles"
import {windowSource, currentArticle, searchResults, animationUpdate, popupWindow, firstRelated,firstClick, hoverNode} from "./reducers"
import {articleTab,currentTab} from "./changeTabs"
import {nodeAdd,nodeStatus,graphDrag} from "./modifyNodes"
const rootReducer = combineReducers({
  animationUpdate,
  nodeAdd,
  popupWindow,
  graphDrag,
  hoverNode,
  currentTab,
  searchResults,
  nodeStatus,
  categoryArticles,
  currentArticle,
  articleTab,
  windowSource,
  firstRelated,
  firstClick,
  fk
})

export default rootReducer
