// this is just a place holder for now
function showEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var EditArticleModal = document.getElementById('edit-artical-modal');

//Show article edit modal and modal backdrop
  modalBackground.classList.remove('hidden');
  EditArticleModal.classList.remove('hidden');
}

function closeEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var EditArticleModal = document.getElementById('edit-artical-modal');

  //Hide article edit modal and modal backdrop
  modalBackground.classList.add('hidden');
  EditArticleModal.classList.add('hidden');
}

function insertArticleEdits(){

}

function articleSearch(){
  var allArticleElems = [];

  var searchInput = document.getElementById('navbar-search-input').value;
  searchInput = searchInput ? searchInput.trim().toLowerCase(): ''; //trim function removes white space around string and toLowerCase makes all letters in string lower case

  //remove all articles from the article container temporarily
  var articleContainer = document.querySelector('article-container');
  while(articleContainer.lastChild){
    articleContainer.removeChild(articleContainer.lastChild);
  }

  //Loop through all the articles and add articles back into the DOM if they contain the search term or if the search term is emppty
  allArticleElems.forEach(function(articleElem){
    if(!searchInput || articleElem.textContent.toLowerCase().indexOf(searchInput) !== -1){
      articleContainer.appendChild(articleElem);
    }
  });
}

var editArticleButton = document.getElementById('edit-buton');
editArticleButton.addEventListener('click', showEditArticleModal);

var modalCancelButton = document.querySelector('.modal-cancel-button');
modalCancelButton.addEventListener('click', closeEditArticleModal);

var modalAcceptButton = document.querySelector('.modal-accept-button');
modalAcceptButton.addEventListener('click', insertArticleEdits);

var searchInut = document.getElementById('navbar-search-input');
searchInut.addEventListener('input', articleSearch);
