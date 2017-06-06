var allArticleElems = [];

function articleSearch(){
  var searchInput = document.getElementById('navbar-search-input').value;
  searchInput = searchInput ? searchInput.trim().toLowerCase(): ''; //trim function removes white space around string and toLowerCase makes all letters in string lower case

    //remove all articles from the article container temporarily
    var articleContainer = document.querySelector('article-container');
    while(articleContainer.lastChild){
        articleContainer.removeChild(articleContainer.lastChild);
    }

    //Loop through all the articles and add articles back into the DOM if they contain the search term or if the search term is emppty
    all =ArticleElems.forEach(function(articleElem){
      if(!searchInput || articleElem.textContent.toLowerCase().indexOf(searchInput) !== -1){
        articleContainer.appendChild(articleElem);
      }
    }); 
}
