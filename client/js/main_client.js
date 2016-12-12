$(document).ready(function () {
	

	$('#nextGroup').click(function(){
		if($('#clientId').val()!=""){
			$('#myModal').modal('hide');
			$('#myModalGroup').modal('show');
		}else{
			alert("Please Input Your Name!!!!");
		}
		
	})
	
	$('#backName').click(function(){
		$('#myModalGroup').modal('hide');
		$('#myModal').modal('show');
	})
	
	$('#go').click(function(){
		var clientId = $('#clientId').val();
		var selectGroup = new Array(); 
		$('input:checkbox:checked').map(function() {
			selectGroup.push($(this).val());
		}).get();
		
		var postData = {
			clientId : $('#clientId').val(),
			groupId: selectGroup
			
		};		
		
		$.ajax({
			type : "POST",
			url: "http://localhost:8080/Announce/saveClientGroup",
			data : JSON.stringify(postData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				alert("OK")
			},
			failure: function(errMsg) {
				alert(errMsg);
			}
		});
		
	})
	
	
});


