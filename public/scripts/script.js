/*function slideNav(){
  var $mainContent = $('#content-wrapper'),
      $menuWrap       = $('#menuwrap');

  $menuWrap.toggleClass('open');
  $mainContent.toggleClass('open');
}

function animateNav(){
  var navButton = $(this);
$navButton.toggleClass('open');
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
*/
function slideMenu() {

  var $menuWrap = $('#menuwrap');

  $menuWrap.toggleClass('open');

}

function animateNav() {
  var $navButton = $(this);
  $navButton.toggleClass('open');
}

function selectMenuItem() {
  var $selectedMenuItem = $(this);
  $selectedMenuItem.addClass('selected');

  var $menu = $('#menu');
  var menuItems = $menu.children();
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i] != this) {
      menuItems[i].className = '';
    }
  }
}

var $navButton = $('#nav-button');
$navButton.on('click', slideMenu);
$navButton.on('click', animateNav);

var $menu = $('#menu');
var menuItems = $menu.children();

for (var i = 0; i < menuItems.length; i++) {
  $(menuItems[i]).on('click', selectMenuItem);
}
