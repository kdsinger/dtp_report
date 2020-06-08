$( document ).ajaxComplete(function() {
  $( ".log" ).text( "Triggered ajaxComplete handler." );
});
$( ".trigger" ).click(function() {
  $( ".result" ).load( "ajax/test.html" );
});
