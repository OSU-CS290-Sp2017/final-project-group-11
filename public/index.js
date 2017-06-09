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

function random_article(){
	//grab all the container of all the articles and put them into this bad boy
	var articleContainer = document.querySelector('article-container');

	//set various indexes which are cool
	var current_index = 0;
	var max_index = article.Container.length - 1;
	var desired_index = Math.floor((Math.random() * (max_index)));

	while(current_index < max_index){
		if(current_index == desired_index){
			//go to this particular articlecontainer's child
			break;
		}
		else{
			current_index += 1;
			articleContainer.removeChild(articleContainer.firstChild);
		}
	}
}

var editArticleButton = document.getElementById('edit-buton');
editArticleButton.addEventListener('click', showEditArticleModal);

var modalCancelButton = document.querySelector('.modal-cancel-button');
modalCancelButton.addEventListener('click', closeEditArticleModal);

var modalAcceptButton = document.querySelector('.modal-accept-button');
modalAcceptButton.addEventListener('click', insertArticleEdits);

var searchInut = document.getElementById('navbar-search-input');
searchInut.addEventListener('input', articleSearch);

var random_article_link = document.getElementById('random_article_button'); //CHECK ID in the actual html/handlebars stuff
random_article_link.addEventListener('click', random_article);
