
var allArticleElems = [];

console.log("JS IS WORKING");

//shows edit article modal:
function showEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var editArticleModal = document.getElementById('edit-article-modal');

//Shows article edit modal and modal backdrop
  modalBackground.classList.remove('hidden');
  editArticleModal.classList.remove('hidden');
}

//closes edit article modal:
function closeEditArticleModal(){
  var modalBackground = document.getElementById('modal-background');
  var editArticleModal = document.getElementById('edit-article-modal');

  //Hide article edit modal and modal backdrop
  modalBackground.classList.add('hidden');
  editArticleModal.classList.add('hidden');

  clearArticleInput();
}

// gets ID of article:
// function getArticleIDFromLocation(){
//   var pathComponents = window.location.pathname.split('/');
//   if(pathComponents[0] !== '' && pathComponents[1] !== 'articles'){ //might not be 'article', need to test
//     return null;
//   }
//   return pathComponents[2];
// }

function clearArticleInput(){
  var inputElems = document.getElementsByClassName('article-input-modal');
  for (var i = 0; i < inputElems.length; i++){
    console.log('bing');
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}


//attempted store new article in articles.json file but ran out of time:
// function storeNewArticle(articleID, newTitle, newContent, newDescription, newAuthor, newImage){
//  /* var postURL = "/articles/" + articleID + "/addArticle";
//
//   var postRequest = new XMLHttpRequest();
//   postRequest.open('POST, postURL');
//   postRequest.setRequestHeader('Content-Type', 'application/json');*/
//
//   var postBody = {
//     title: newTitle,
//     content: newContent,
//     description: newDescription,
//     author: newAuthor,
//     image: newImage
//   };
//   portRequest.send(JSON.stringify(postBody));
// }

//attempted add new article function to main screen but ran out of time:
// function insertNewArticle(){
//   var newTitle = document.getElementById("article-title-input").value || '';
//   var newContent = document.getElementById("article-content-input").value || '';
//   var newDescription = document.getElementById("article-description-input").value || '';
//   var newAuthor = document.getElementById("article-author-input").value || '';
//   var newImage = document.getElementById("article-image-input").value || '';
//
//   var articleTemplate = Handlebars.templates.article_for_main;
//   var articleData = {
//     title: newTitle,
//     description: newDescription
//   };
//
//   if(newTitle, newContent, newDescription, newAuthor, newImage){
//     var newArticleElem = articleTemplate;
//     var articleContainer = document.querySelector('article-container');
//     articleContainer.insertAdjacentHTML('beforeend', newArticleElem);
//     allArticleElems.push(newArticleElem);
//
//     storeNewArticle(articleID, newTitle, newContent, newDescription, newAuthor, newImage);
//     //clear user input:
//     newTitle.value = "";
//     newContent.value = "";
//     newDescription.value = "";
//     newAuthor.value = "";
//     newImage.value = "";
//     closeEditArticleModal();
//   }
// }


function generateArticle(){
  var articleTitle = document.getElementById('article-title-input').value || '';
  var artContent = document.getElementById('article-content-input').value || '';
  var artDescription = document.getElementById('article-description-input').value || '';
  var artAuthor = document.getElementById('article-author-input').value || '';
  var artImage = document.getElementById('article-image-input').value || '';

  if(artImage.trim()){
    console.log('first IF');

    storeArticle( articleTitle,artContent, artDescription, artAuthor, artImage, function(err){
      if (err){
        alert("unable to save article. got this error: \n\n" + err );
      }else {
        console.log('Handlebars');
        // var source = $('#article_for_main').html();
        // var articleTemplate = Handlebars.compile(source);
          var articleTemplate = Handlebars.templates.article_for_main;
        var articleData = {
          title: articleTitle,
          description: artDescription
        };
        var articleHTML = articleTemplate(articleData);
        var articleListContainer = document.querySelector('.article-container');
        articleListContainer.insertAdjacentHTML('beforeend', articleHTML);
      }
    });

    console.log('closeModal');
    closeEditArticleModal();
}else {
  alert('I need an image!!!');
}


}
function storeArticle( title,content, description, author, image, callback) {
  console.log('StoreArticle');
    var postURL = "/articles/addArticle";


    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', postURL);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function(event){
      var error;
      if (event.target.status !== 200){
        error = event.target.response;
      }
      callback(error);
    });

    var postBody = {
      title: title,
      content: content,
      description: description,
      author: author,
      image: image
    };
      console.log('posting');
    postRequest.send(JSON.stringify(postBody));
  }







//this searches through the articles on the main screen. Code for this function was inspired by Dr. Hess's tweeter page
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


//this would have generated a rando article for the user but ran out of time:
// function random_article(){
// 	console.log("inside random article link");
// 	//grab all the container of all the articles and put them into this bad boy
// 	var articleContainer = document.querySelector('article-container');
//
// 	//set various indexes which are cool
// 	var current_index = 0;
// 	var max_index = article.Container.length - 1;
// 	var desired_index = Math.floor((Math.random() * (max_index)));
//
// 	while(current_index < max_index){
// 		if(current_index == desired_index){
// 			//go to this particular articlecontainer's child
// 			break;
// 		}
// 		else{
// 			current_index += 1;
// 			articleContainer.removeChild(articleContainer.firstChild);
// 		}
// 	}
// }

//Make sure DOM content is loaded before interactions
window.addEventListener('DOMContentLoaded', function(){
  var articleElemsCollection = document.getElementsByClassName('article');
  for (var i=0; i < articleElemsCollection.length; i++){
    allArticleElems.push(articleElemsCollection[i]);
  }
//These event listeners allow for user interactions:
var editArticleButton = document.getElementById('edit-button');
editArticleButton.addEventListener('click', showEditArticleModal);

var modalCancelButton = document.querySelector('#edit-article-modal .modal-cancel-button');
modalCancelButton.addEventListener('click', closeEditArticleModal);

 var modalAcceptButton = document.querySelector('#edit-article-modal .modal-accept-button');
 modalAcceptButton.addEventListener('click', generateArticle);

var searchInput = document.getElementById('navbar-search-input');
searchInput.addEventListener('input', articleSearch);

// var random_article_link = document.getElementById('random_article');
// random_article_link.addEventListener('click', random_article);

});
