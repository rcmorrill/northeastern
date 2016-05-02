
function toggleItem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove('myactive');
        } 
        else if (current.classList.contains('myactive') === true) {
          current.classList.remove('myactive');
        } 
        else {
          current.classList.add('myactive')
        }
      }
      e.preventDefault();
    });
  };
}
toggleItem(document.querySelectorAll('.btn'));


//////////////// end //////////////////////////////
////////////////page 2//////////////////////////////

$(document).ready(function(){
    $("#btn-2").on('click', function(){
        $(".scene").hide(); 
        $("#scene-2").show();
        

    })});
//////////////// end //////////////////////////////
////////////////page 3//////////////////////////////

$(document).ready(function(){
    $("#btn-3").on('click', function(){
    $(".scene").hide(); 
    $("#scene-3").show();






})});
//////////////// end //////////////////////////////
////////////////page 4//////////////////////////////

$(document).ready(function(){
    $("#btn-4").on('click', function(){
    $(".scene").hide(); 
    $("#scene-4").show();

    





})});

//////////////// end //////////////////////////////
////////////////page 5//////////////////////////////

$(document).ready(function(){
    $("#btn-5").on('click', function(){
    $(".scene").hide(); 
    $("#scene-5").show();







})});





