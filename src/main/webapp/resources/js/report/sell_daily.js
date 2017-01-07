/**
 * 文件名：sell_daily
 * 用途：销售日报表页相关js
 * 作者：Xia ZhengWei
 * 时间: 2016-11-26
 */
// base:项目根路径
var base;
$(function() {
	base = $("base").attr('href');
	
	// 绑定日期事件
	$('#startDate').datepicker({format: 'yyyy-mm-dd'});
	
	// 页面初始化加载数据
	initData();
	
	// 查询功能
	$(".btn-success").click(function(){
		// 查询数据
		initData();
	});
	
	// 所属区域变化事件
	$("#area").change(function(){
		// 查询数据
		initData();
	});
	
	// 导出功能
	/*$("#export").click(function(){
		alert("暂时还没有做......");
	});*/
	
	// 保存信息
	$("#saveSell").click(function(){
		var options = {
		     type:"POST",
		     dataType:"json",
		     success:function(data){
		    	 if(data.status == 1) {
		    		 alert("操作成功");
		    		 location.reload();
		    	 }else {
		    		 if(data.text) {
		    			 alert(data.text);
		    		 }else {
		    			 alert("操作失败,请刷新后重试");
		    		 }
		    	 }
		     },
		     error:function(err){
		    	 alert("操作失败,请刷新后重试");
		     }
		}
		$('#form').ajaxForm(options);
	});

});

// 初始获取数据
function initData() {
	// 给隐藏域赋值
	$("input[name='area']").val($("#area").find("option:selected").val());
	$.ajax({
		"dataType": 'json',
		"type": "POST",
		"url": base + "report/ajaxSellDaily",
		"data": {
			startDate : $('#startDate').val(),
			area : $("#area").val()
		},
		"success": function(data){
			var area = $("#area").find("option:selected").text();
			var type = data.type;
			var goodsList = data.goodsList;
			var clearing = data.clearing;
			$("#sellDaily").empty();
			if(type == "compile" & (goodsList.length > 0 || clearing.length > 0)) {
				$("#saveSell").show();
			}
			var html =  "<tr><td colspan='6' style='background: #CCDDFF; font-size: 20px; font-weight: bold;'>" + area + "销售日报表</td></tr>" +
						"<tr><td colspan='6' style='text-align: left;'><div style='width: 15%; margin-left: 10%;'>日&nbsp;&nbsp;&nbsp;&nbsp;期 <span style='margin-left: 20%;'>" + $('#startDate').val() + "</span></div></td></tr>" +
						"<tr><td colspan='6' style='font-weight: bold;'>销售藏品明细</td></tr>" +
						"<tr>" +
							"<td>藏品名称</td>" +
				           	"<td>数&nbsp;&nbsp;量</td>" +
							"<td>单&nbsp;&nbsp;价</td>" +
				           	"<td>总计金额</td>" +
				           	"<td colspan='2'>备&nbsp;&nbsp;注</td>" +
						"</tr>";
			var contents = "";
			var total = "";
			
			if(type == "search") {
				for (var int = 0; int < goodsList.length; int++) {
					contents = "<tr>" + 
								"<td>" + goodsList[int].goodsName + "</td>" + 
								"<td>" + goodsList[int].count + "</td>" + 
								"<td>" + goodsList[int].unitPrice + "</td>" + 
								"<td>" + goodsList[int].totalPrices + "</td>" + 
								"<td colspan='2'>" + goodsList[int].remark + "</td>" +
							"<tr>";
					total += goodsList[int].totalPrices;
					html += contents;
				}
				
			}else if(type == "compile") {
				for (var int = 0; int < goodsList.length; int++) {
					contents = "<tr>" + 
								"<td><input type='text' name='sellGoodsDetails["+int+"].goodsName' readonly='readonly' value='" + goodsList[int].goodName + "'/></td>" + 
								"<td><input type='text' name='sellGoodsDetails["+int+"].count' readonly='readonly' value='" + goodsList[int].amount + "'/></td>" + 
								"<td><input type='text' name='sellGoodsDetails["+int+"].unitPrice' readonly='readonly' value='" + goodsList[int].price + "'/></td>" + 
								"<td><input type='text' name='sellGoodsDetails["+int+"].totalPrices' readonly='readonly' value='" + goodsList[int].totalPrice + "'/></td>" + 
								"<td colspan='2'><input type='text' name='sellGoodsDetails["+int+"].remark' readonly='readonly' value='" + goodsList[int].viewRemark + "'/></td>" +
							"<tr>";
					total += goodsList[int].totalPrice;
					html += contents;
				}
			}
			contents = "<tr style='background: #CCDDFF;'>" + 
							"<td>合&nbsp;&nbsp;计</td>" + 
							"<td></td>" + 
							"<td></td>" + 
							"<td>" + total + "</td>" + 
							"<td colspan='2'></td>" +
						"<tr>" +
						"<tr><td colspan='6' style='font-weight: bold;'>资金结算明细</td></tr>" +
						"<tr>" +
						"<td>账&nbsp;&nbsp;户</td>" +
						"<td>收款方式</td>" +
						"<td>金&nbsp;&nbsp;额</td>" +
						"<td>实际入账</td>" +
						"<td>手续费</td>" +
						"<td>备&nbsp;&nbsp;注</td>" +
						"</tr>";
			html += contents;
			total = "";
			var income = "";
			var poundages = "";
			
			if(type == "search") {
				for (var int = 0; int < clearing.length; int++) {
					contents = "<tr>" + 
								"<td>" + clearing[int].paymentAccountName + "</td>" + 
								"<td>" + clearing[int].customerPayType + "</td>" + 
								"<td>" + clearing[int].payAmount + "</td>" + 
								"<td>" + clearing[int].payAmountActual + "</td>" + 
								"<td>" + clearing[int].poundage + "</td>" + 
								"<td>" + clearing[int].remarks + "</td>" + 
							"<tr>";
					total += clearing[int].payAmount;
					income += clearing[int].payAmountActual;
					poundages += clearing[int].poundage;
					html += contents;
				}
			}else if(type == "compile") {
				for (var int = 0; int < clearing.length; int++) {
					contents = "<tr>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].paymentAccountName' readonly='readonly' value='" + clearing[int].paymentAccountName + "'/></td>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].customerPayType' readonly='readonly' value='" + clearing[int].customerPayType + "'/></td>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].payAmount' readonly='readonly' value='" + clearing[int].payAmountActual + "'/></td>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].payAmountActual' readonly='readonly' value='" + clearing[int].income + "'/></td>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].poundage' readonly='readonly' value='" + clearing[int].poundage + "'/></td>" + 
								"<td><input type='text' name='sellDailyDetails["+int+"].remark'/></td>" + 
							"<tr>";
					total += clearing[int].payAmountActual;
					income += clearing[int].income;
					poundages += clearing[int].poundage;
					html += contents;
				}
			}
			
			contents = "<tr style='background: #CCDDFF;'>" + 
							"<td>合&nbsp;&nbsp;计</td>" + 
							"<td></td>" +
							"<td>" + total + "</td>" + 
							"<td>" + income + "</td>" + 
							"<td>" + poundages + "</td>" + 
							"<td></td>" +
						"<tr>";
			html += contents;
			$("#sellDaily").append(html);
		}
	});
}