var count = 0;
$ (function () {
	function add_all_message() {
		$.ajax(
		{
			url: 'add_all_message.php',
			type: 'POST',
			data:{number_div: count,},
			dataType: 'json',
			success: function (result)
			{
				$("#message_box").html(function (index, oldhtml) {
					result.forEach(function (mes){
						oldhtml += '<span class="name">' + mes.name + '	' + mes.time + '</span><div>' + mes.message + '</div>';
					});
				return oldhtml; });
				count += result.count;
			}
		 });	
	 }

	 setInterval(function() {
		 add_all_message();
	 }, 2000);

});
