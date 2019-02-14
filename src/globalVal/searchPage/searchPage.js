
let searchPageIndexVueObj = null;
function getSearchPageIndexVueObj () {
  return searchPageIndexVueObj;
}


function setSearchPageIndexVueObj ( obj ) {
  searchPageIndexVueObj = obj;
}


export default {
  searchPageSingleOne: {
    getSearchPageIndexVueObj,
    setSearchPageIndexVueObj

  }


}
