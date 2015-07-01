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
$navButton.on('click', function(slideMenu));
$navButton.on('click', function(animateNav));

var $menu = $('#menu');
var menuItems = $menu.children();

for (var i = 0; i < menuItems.length; i++) {
  $(menuItems[i]).on('click', selectMenuItem);
}
