function slideNav(){
  var $mainContent = $('#content-wrapper'),
      $menuWrap       = $('#menuwrap');

  $menuWrap.toggleClass('open');
  $mainContent.toggleClass('open');
}

function animateHome(){
  var homeButton = $(this);
$homeButton.toggleClass('open');
}

function selectItem(){
  var selectedItem = $(this);
  $selectedItem.addClass('selcted');
  $(this).siblings().removeClass('selected');
}

var navButton = $('#nav-button');
$navButton.on('click', slideMenu);
$navButton.on('click', animateHome);

var $menu = $('menu');
var menuItem = $menu.children();

for (var i =0; i< menuItem.length; i++){
  $(menuItem[i]).on('click, selectItem');
}
