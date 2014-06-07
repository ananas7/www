var count = 0;
var flag = true;
var map = {};
map[0]=true;
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
		$.ajax({
			url: 'show_message.php',
			type: 'POST',
			data:{number_div: count, hidden: $('#block').val()},
			dataType: 'json',
			success: function (result) {
				if(result.length > 0) {
					$("#message_box").html(function (index, oldhtml) {
						result.forEach(function (mes){
							if(!map[mes.id]) {
								if(mes.name == $("#my_name").val()) {
									oldhtml += '<div class="my_name">' + mes.name + '	' + mes.time + 
									'</div><div style="text-align: right" class="message"><p>' + escapeHtml(mes.message) + '</p></div>';
								} else {
									oldhtml += '<div class="name">' + mes.name + '	' + mes.time + '</div><div class="message"><p>' 
									+ escapeHtml(mes.message) + '</p></div>';
								}
								map[mes.id]=true;
							}
						});
						return oldhtml;
					});
					count += result.length;
					document.getElementById('message_box').scrollTop = 9999*count;
				}
			}
		});
	}
	function add_message () {
		if(map[count])
			var mes = $('#mes').val();
		$('#mes').val('');
		$.ajax(
		{
			url: 'add_message.php',
			type: 'POST',
			data:{msgtext: mes, hidden: $('#block').val(),},
			dataType: 'json',
			success: function (result)
			{	
				
			}
		});
	};
	$('#mes').keydown(function(event) {
        if (event.which == 13 && !event.shiftKey) {
			event.which = 0;
			event.preventDefault();
			add_message();
    	}
    });
	$("#log").click(function() {
		if($('#login').val() == '')
			alert('Введите свой ник и пароль, пожалуйста.');
	});
	$("#send").click(function() {
		if($('#login').length>0 && $('#login').val() == '')
			alert('Вы не залогинены.');
		else
			add_message();
	});
	function load() {
		setInterval(function() {
			show_message();
		}, 2000);
	}
	load();
});
