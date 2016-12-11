$(document).ready(function () {
	
	loadData();
	
	
	$(document).on('click', '.btnDeleteAnnounce', function(e) {
		if(confirm("ต้องการลบข้อมูลหรือไม่")){
			var announceId = $(this).attr('announceId');
			
			$.ajax({
				type : "GET",
				url: "http://localhost:8080/Announce/deleteAnnounceById/"+announceId,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					$('#Content').html('');
					loadData();
				},
				failure: function(errMsg) {
					alert(errMsg);
					
				}
			});
					
		}
  	});
	
});

	function loadData(){
		$('.modal').show();
		$.ajax({
			type : "GET",
			url: "http://localhost:8080/Announce/loadAllAnnounce",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				$.each(data.announceListBean, function(key, value) {  		
					var row = "<div class='desc'>";
					row = row + "<div class='thumb'>";
					row = row + "<img class='img-circle' src='"+value.announceImage+"' width='35px' height='35px' align=''>";
					row = row + "</div>";
					row = row + "<div class='details'>";
					row = row + "<p><a href='edit_announce.html?announceId="+value.announceId+"'>"+value.announceSubject+"</a><br/>";
					row = row + "<muted></muted>";
					row = row + "</p>";
					row = row + "</div>";
					row = row + "<div class='pull-right' >";
					row = row + "<button type='button' class='btn btn-danger btnDeleteAnnounce' announceId='"+value.announceId+"' style='margin-right: 15px;'>ลบ</button></i></button>";
					row = row + "<a href='edit_announce.html?announceId="+value.announceId+"'><button type='button' class='btn btn-warning' style='margin-right: 15px;'>แก้ไข</button></i></button></a>";
					row = row + "</div>";
					row = row + "</div>";		
					$('#Content').append(row);
					$('.modal').hide();
				});	
			},
			failure: function(errMsg) {
				alert(errMsg);
				$('.modal').hide();
			}
		});
		
	}
	
	

