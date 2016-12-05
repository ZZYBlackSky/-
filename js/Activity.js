$(function(){
	$.ajax({
			type:"GET",
			dataType:'jsonp',
			url:"http://wt.cctbn.com/index.php?g=1202&m=Index&a=top3",
			jsonp: "callback",
            jsonpCallback:"top3",
			async:true,
			success:function(res){
				setDatachampion(res)
			}
		});	
		function setDatachampion(res){
			for (var i = 0; i < $(".activity_champion_li").length; i++) {
				var championNumber =pad(res[i].wid,3)
				$(".activity_champion_imgcode").eq(i).text("编号：MK" + championNumber);
				$(".activity_champion_img").css({
					background:"url(http://wt.cctbn.com/tpl/1202/images/" + res[i].portrait + ")"
				})
			}
		}
	
		function pad(num,n) {
			var len = num.toString().length;
			while(len < n) {
			num = "0" + num;
			len++;
			}
			return num;
			}
			
	
//	$.ajax({
//			type:"GET",
//			dataType:'jsonp',
//			url:"http://wt.cctbn.com/index.php?g=1202&m=Index&a=works_page",
//			jsonp: "callback",
//          jsonpCallback:"works_page",
//			async:true,
//			data:{type:"page"},
//			success:function(res){
//				console.log(res)
//				setDataVote(res);
//			}
//		
//	});
	
//	
//	function setDataVote(res){
//		for (var i = 0; i < 4; i++) {
//			var userId = pad(res[i].id,3);
//				var objVote = $( '<li class="activity_vote_AnchorsContent">'+
//							'<img class="activity_img" src="http://wt.cctbn.com/tpl/1202/images/'+ res[i].cover +'"/>'+
//							'<p class="activity_comment">' + res[i].synopsis + '</p>'+
//							'<div class="activity_vote_Anchor_p">'+
//								'<div class="activity_allp">'+
//									'<p class="activity_user">上传者:' + res[i].uploader + '</p>'+
//									'<p class="activity_number">编号：' + userId + '</p>'+
//									'<p class="activity_votes">投票数：' + res[i].piao + '票</p>'+
//								'</div>'+
//								'<img class="activity_user_head" src="http://wt.cctbn.com/tpl/1202/images/' + res[i].portrait + '"/>'+
//							'</div>'+
//							'<button class="submit_vote" type="submit">投票</button>'+
//						'</li>');
//				$(".activity_vote_Anchors").append(objVote);
//						
//		}
//	}

		
    var counter = 0;
    // 每页展示4个
    var num = 4;
    var pageStart = 0,pageEnd = 0;
		
    // dropload下拉
    var voteNum = 0;
    
    $('.activity_vote_Anchor').dropload({
        scrollArea : window,
//      domUp : {
//          domClass   : 'dropload-up',
//          domRefresh : '<div class="dropload-refresh">↓下拉刷新-自定义内容</div>',
//          domUpdate  : '<div class="dropload-update">↑释放更新-自定义内容</div>',
//          domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>'
//      },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData"></div>'
        },
//      loadUpFn : function(me){
//          $.ajax({
//              type: 'GET',
//              url: 'http://wt.cctbn.com/index.php?g=1202&m=Index&a=works_page',
//              dataType: 'jsonp',
//				jsonp: "callback",
//	            jsonpCallback:"works_page",
//				async:true,
//				data:{beginPage:1,num:4},
//              success: function(res){
//                  var result = '';
//                  for(var i = 0; i < data.lists.length; i++){
//                  		result += '<li class="activity_vote_AnchorsContent">'+
//							'<img class="activity_img" src="http://wt.cctbn.com/tpl/1202/images/'+ res[i].cover +'"/>'+
//							'<p class="activity_comment">' + res[i].synopsis + '</p>'+
//							'<div class="activity_vote_Anchor_p">'+
//								'<div class="activity_allp">'+
//									'<p class="activity_user">上传者:' + res[i].uploader + '</p>'+
//									'<p class="activity_number">编号：' + userId + '</p>'+
//									'<p class="activity_votes">投票数：' + res[i].piao + '票</p>'+
//								'</div>'+
//								'<img class="activity_user_head" src="http://wt.cctbn.com/tpl/1202/images/' + res[i].portrait + '"/>'+
//							'</div>'+
//							'<button class="submit_vote" type="submit">投票</button>'+
//						'</li>'
//                  }
//                  // 为了测试，延迟1秒加载
//                  setTimeout(function(){
//                      $('.activity_vote_Anchors').html(result);
//                      // 每次数据加载完，必须重置
//                      me.resetload();
//                      // 重置索引值，重新拼接more.json数据
//                      counter = 0;
//                      // 解锁
//                      me.unlock();
//                      me.noData(false);
//                  },1000);
//              },
//              error: function(xhr, type){
//                  alert('Ajax error!');
//                  // 即使加载出错，也得重置
//                  me.resetload();
//              }
//          });
//      },
        loadDownFn : function(me){
        		voteNum ++;
        		sessionStorage.setItem("num",voteNum);
        		var  voteNumbers = sessionStorage.getItem("key");
            $.ajax({
                type: 'GET',
                url: 'http://wt.cctbn.com/index.php?g=1202&m=Index&a=works_page',
                dataType: 'jsonp',
				jsonp: "callback",
	            jsonpCallback:"works_page",
				async:true,
				data:{type:"page"},
                success: function(res){
                	console.log(res.length)
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    for(var i = pageStart; i < pageEnd; i++){
                    		var userId = pad(res[i].id,3);
                       result += '<li class="activity_vote_AnchorsContent">'+
							'<img class="activity_img" src="http://wt.cctbn.com/tpl/1202/images/'+ res[i].cover +'"/>'+
							'<p class="activity_comment">' + res[i].synopsis + '</p>'+
							'<div class="activity_vote_Anchor_p">'+
								'<div class="activity_allp">'+
									'<p class="activity_user">上传者:' + res[i].uploader + '</p>'+
									'编号：<p class="activity_number">MK' + userId + '</p>'+
									'<p class="userID">' + res[i].id + '</p>'+
									'<p class="activity_votes">投票数：<span>' + res[i].piao + '</span>票</p>'+
								'</div>'+
								'<img class="activity_user_head" src="http://wt.cctbn.com/tpl/1202/images/' + res[i].portrait + '"/>'+
							'</div>'+
							'<button class="submit_vote" type="submit">投票</button>'+
						'</li>';
						
                    
                        if((i + 1) >= res.length){                    	
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            setInterval(function(){
                            		$(".activity_vote_Anchor_footer").css({
					    				"display": "block"
					    			})
                            },400)
	                   
                            break;
                        }
                    }
                    
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('.activity_vote_Anchors').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                        
//投票					
						
                        $(".submit_vote").on("click",function(e){
                        		var num1 = Number($(this).prev().find("p").eq(3).find("span").text());
//						   	console.log($(this).prev().find("p").eq(1).text())
//						   	console.log($(this).prev().find("p").eq(2).text())
							var userId = $(this).prev().find("p").eq(2).text();
							var worksNum = $(this).prev().find("p").eq(1).text();
						   	$.ajax({
						   		type:"get",
						   		dataType: 'jsonp',
						   		url:"http://wt.cctbn.com/index.php?g=1202&m=Index&a=vote",
						   		async:true,
						   		jsonp: "callback",
	           					jsonpCallback:"vote",
						   		data:{uid:100,works_id:userId},
						   		success:function(res){
						   			console.log(res);
						   			if(res.flag == "y"){
						   				
			                        		num1++;
			                   			$(this).prev().find("p").eq(3).find("span").text(num1);
						   				alert("您还有"+ res.num + "次投票机会")
						   			}
						   			else{
						   				alert("您今天的投票次数已经用完，请明天再来投票，谢谢")
						   			}
						   			
						   		}
						   	});
						   })
                                              
                    },300);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        threshold : 50
    });
 
});