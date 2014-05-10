var count = 0;
var flag = true;
$(function () {
	function escapeHtml(text) {
	  return text
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	}
	function show_message() {		
		$.ajax(
		{
			url: 'show_message.php',
			type: 'POST',
			data:{number_div: count,},
			dataType: 'json',
			success: function (result)
			{	
				if(result.length > 0) {
					$("#message_box").html(function (index, oldhtml) {
						result.forEach(function (mes){
							oldhtml += '<span class="name">' + mes.name + '	' + mes.time + '</span><div><p>' + escapeHtml(mes.message) + '</p></div>';
						});
					return oldhtml; });
					count += result.length;
					document.getElementById('message_box').scrollTop = 9999;
				}
			}
		});
	}
	function add_message () {
		$.ajax(
		{
			url: 'add_message.php',
			type: 'POST',
			data:{msgtext: $('#mes').val(),},
			dataType: 'json',
			success: function (result)
			{	
				$('#mes').val('');
			}
		});
	};
	$('#mes').keydown(function(event) {
        if (event.which == 13 && !event.shiftKey)
        {
			event.preventDefault();
			add_message();
    	}
    });
	$("#send").click(add_message());
	function load() {
		setInterval(function() {
			show_message();
		}, 2000);
	}
	load();
});
