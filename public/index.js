// this is just a place holder for now
var allArticleElems = [];

console.log("JS IS WORKING");

function showEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var editArticleModal = document.getElementById('edit-article-modal');

//Show article edit modal and modal backdrop
  modalBackground.classList.remove('hidden');
  editArticleModal.classList.remove('hidden');
}

function closeEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var editArticleModal = document.getElementById('edit-article-modal');

  //Hide article edit modal and modal backdrop
  modalBackground.classList.add('hidden');
  editArticleModal.classList.add('hidden');
}

//WHY IS THIS HERE
// function updateArticle(articleText){
//   var
// }


function insertArticleEdits(){
 var articleEdit = document.getElementById('article-text-input');

 if(articleEdit){
   var updatedArticle =
   closeCreateTwitModal();
 }
 else{
   alert('You cannot leave an article blank! Since you did not like the original content get creative and write your own article!');
 }
}

function articleSearch(){
  var searchInput = document.getElementById('navbar-search-input').value;
  searchInput = searchInput ? searchInput.trim().toLowerCase(): ''; //trim function removes white space around string and toLowerCase makes all letters in string lower case

  //remove all articles from the article container temporarily
  var articleContainer = document.querySelector('.article-container');
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

//Make sure DOM content is loaded before interactions
window.addEventListener('DOMContentLoaded', function(){
  var articleElemsCollection = document.getElementsByClassName('article');
  for (var i=0; i < articleElemsCollection.length; i++){
    allArticleElems.push(articleElemsCollection[i]);
  }

var editArticleButton = document.getElementById('edit-button');
editArticleButton.addEventListener('click', showEditArticleModal);

var modalCancelButton = document.querySelector('#edit-article-modal .modal-cancel-button');
modalCancelButton.addEventListener('click', closeEditArticleModal);

// var modalAcceptButton = document.querySelector('#edit-article-modal .modal-accept-button');
// modalAcceptButton.addEventListener('click', insertArticleEdits);

var searchButton = document.getElementById('navbar-search-button');
searchButton.addEventListener('click', articleSearch);

var searchInput = document.getElementById('navbar-search-input');
searchInput.addEventListener('input', articleSearch);

var random_article_link = document.getElementById('random_article'); //CHECK ID in the actual html/handlebars stuff
random_article_link.addEventListener('click', random_article);

});
