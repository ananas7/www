var count = 0;
$ (function () {
function ShowResults(value, index, ar) {
    $('#message_box') = $('<span class="name">' . value.name . '	' . value.time . '</span> <div>' . value.message . '</div>').prop('outerHTML');
}
	function add_all_message() {
		$.ajax(
		{
			url: 'add_all_message.php',
			type: 'POST',
			data:{number_div: count,},
			dataType: 'json',
			success: function (result)
			{
				result.forEach(ShowResults)
				count += result.count();
			}
		 });	
	 }

	 setInterval(function() {
		 add_all_message();
	 }, 2000);

});
