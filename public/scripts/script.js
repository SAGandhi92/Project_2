function slideMenu() {

  var $menuWrap = $('#menuwrap');

  $menuWrap.toggleClass('open');

}
var $navButton = $('#nav-button');

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

$navButton.on('click', slideMenu);
$navButton.on('click', animateNav);

var $menu = $('#menu');
var menuItems = $menu.children();

for (var i = 0; i < menuItems.length; i++) {
  $(menuItems[i]).on('click', selectMenuItem);
}
