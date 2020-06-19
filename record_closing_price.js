// https://kr.investing.com/equities/royal-dutch-shell-b-plc 

function response(room, msg, sender, isGroupChat, replier, ImageDB) {	
//	try {

		var arraymsg = msg.split(" ");

		if ((arraymsg[0] == "종가"||arraymsg[0] == "기록") && arraymsg[1] != null) {
			var stockname = arraymsg[1];
			var qurryURL = "https://www.google.com/search?q="+stockname+" " + "역사적인 가격";
	
			var firstpage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
			.ignoreContentType(true)
			.get()
		//replier.reply(firstpage)
		
	//	 investing redirect
			var investingURL =firstpage
			.select("div.r").select("a").first().attr("href");//.first().attr("href"); // 문자열로 바꿔 주기 위해 + ""
	// 
	//		if (investingURL == ""){
	//			replier.reply(stockname + "의 주가를 찾을수 없습니다.")
	//			return 0;
	//		}
	 
//	investingURL = investingURL.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
//  investingURL = investingURL.replace(/\n/g, " "); // 엔터 제거

			var datapage = org.jsoup.Jsoup.connect(investingURL) // 차트 data
				.ignoreContentType(true)
				.get()
		
			var trs = datapage
				.select("table.genTbl.closedTbl.historicalTbl").select("tbody").select("tr");
		
			var result = "";
		
			for(var i = 0; i < 10; i++){
				var date = trs.get(i).select("td").get(0)+" ";
				date = date.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
				date = date.replace(/\n/g, " "); // 엔터 제거
				date = date.replace("년 ",".");
				date = date.replace("월 ",".");
				date = date.replace("일"," ");
		
				var price = trs.get(i).select("td").get(1)+" ";
				price = price.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
				price = price.replace(/\n/g, " "); // 엔터 제거
		
				var pricemove = trs.get(i).select("td").get(6)+" ";
				pricemove = pricemove.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
				pricemove = pricemove.replace(/\n/g, " "); // 엔터 제거
		
				result = result+ date+": " + price +" ("+ pricemove+")" + "\n";
			}		

			replier.reply("[ "+stockname+" ]"+"\n"+result)
		}
//	}
//	catch(e) {
//	replier.reply(e);	
//	}
}