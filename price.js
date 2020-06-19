 function response(room, msg, sender, isGroupChat, replier, ImageDB) {	
  var msg2 = msg
  msg = msg.split(' ')  
  if (msg[0] == "주가" ) {
	var stockname = msg[1] 
    var qurryURL = "https://www.google.com/search?q=" + "주가 " +stockname;
	//replier.reply("data connect 시작")
	
	var datapage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
		.ignoreContentType(true)
		.get()
		//replier.reply("data connect 완료")
	
	//검색된 종목 이름
    var searchstockname =datapage
        .select("div.oPhL2e") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")
	if (searchstockname == ""){
		replier.reply(stockname + "의 주가를 찾을 수 없습니다.")
		return 0
	}

    searchstockname = searchstockname.replace(/<[^>]+>/g, "");
	searchstockname = searchstockname.replace(/\n/g, " ");	
	//검색된 종목 종류
    var searchstockcategori =datapage
        .select("div.HfMth") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockcategori = searchstockcategori.replace(/<[^>]+>/g, "");
	searchstockcategori = searchstockcategori.replace(/\n/g, " ");
	var stockcode1 = searchstockcategori.split(" ")
	var stockcode2 = stockcode1[3]


	//검색된 종목 최종 주가 날짜
    var searchstockpricedate =datapage
        .select("span[jsname=ihIZgd]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")
    searchstockpricedate = searchstockpricedate.replace(/<[^>]+>/g, "");
	
	//검색된 종목 화폐
    var exchange =datapage
        .select("span.knFDje") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    exchange = exchange.replace(/<[^>]+>/g, "");
	exchange = exchange.replace(/\n/g, " ");
	
	
	//검색된 종목 최종 주가
    var searchstockprice =datapage
        .select("span.IsqQVc.NprOob") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockprice = searchstockprice.replace(/<[^>]+>/g, "");

	//검색된 종목 최종 주가 증가
    var searchstockpricevariance =datapage
        .select("span[jsname=qRSVye]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpricevariance = searchstockpricevariance.replace(/<[^>]+>/g, "");
	searchstockpricevariance = searchstockpricevariance.replace(/\n/g, " ");
	
	//검색된 종목 최종 주가 증가 퍼센티지
    var searchstockpricevariancepercentage =datapage
        .select('span[jsname=rfaVEf]') + ""; // 문자열로 바꿔 주기 위해 + ""
		
    searchstockpricevariancepercentage = searchstockpricevariancepercentage.replace(/<[^>]+>/g, "");
	searchstockpricevariancepercentage = searchstockpricevariancepercentage.split("\n")
	searchstockpricevariancepercentage = searchstockpricevariancepercentage[0]

	//검색된 종목 프리/애프터 주가
    var searchstockpreafterprice =datapage
        .select("span[jsname=wurNO]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterprice = searchstockpreafterprice.replace(/<[^>]+>/g, "");
	
	if (searchstockpreafterprice == ""){

		var searchstockDividendYield =datapage
        .select("td.iyjjgb") + ""; // 문자열로 바꿔 주기 위해 + ""
		//replier.reply("종가 data 완료")

		searchstockDividendYield = searchstockDividendYield.replace(/<[^>]+>/g, "");
		searchstockDividendYield = searchstockDividendYield.split("\n");
		searchstockDividendYield = searchstockDividendYield[5]
		//출력 메세지
		var infomsg = 
		"[" + searchstockname +"]" + "\n" + 
		searchstockcategori + "\n" +
		"[" + searchstockpricedate+"]" + "\n" +
		exchange + searchstockprice + ", " + searchstockpricevariance+searchstockpricevariancepercentage +"\n" +
		"[ Dividend yield ] : " + searchstockDividendYield + "\n";
		replier.reply(infomsg);
		return 0;
	}
	
	//검색된 종목 프리/애프터 주가 증가
    var searchstockpreafterpricevariance =datapage
        .select("span[jsname=TmYleb]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterpricevariance = searchstockpreafterpricevariance.replace(/<[^>]+>/g, "");

	//검색된 종목 프리/애프터 주가 증가 퍼센티지
    var searchstockpreafterpricevariancepercentage =datapage
        .select("span[jsname=sam3Lb]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterpricevariancepercentage = searchstockpreafterpricevariancepercentage.replace(/<[^>]+>/g, "");

	//검색된 종목 배당수익률
    var searchstockDividendYield =datapage
        .select("td.iyjjgb") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockDividendYield = searchstockDividendYield.replace(/<[^>]+>/g, "");
	searchstockDividendYield = searchstockDividendYield.split("\n");
	searchstockDividendYield = searchstockDividendYield[5]



	//출력 메세지
    var infomsg = 
	"[" + searchstockname +"]" + "\n" + 
	" "+ searchstockcategori + "\n" +
	"[" + searchstockpricedate+"]" + "\n" +
	exchange + searchstockprice + ", " + searchstockpricevariance+searchstockpricevariancepercentage +"\n" +
	"[ Pre & After Market ]" + "\n" +
	exchange + searchstockpreafterprice +", "+ searchstockpreafterpricevariance + " " + searchstockpreafterpricevariancepercentage + "\n" + 
	"[ Dividend yield ] : " + searchstockDividendYield + "\n";
    replier.reply(infomsg);
  }
  if (msg2[0] == "/" ) {
	var stockname = msg2.slice(1);
    var qurryURL = "https://www.google.com/search?q=" + "주가 " +stockname;
	//replier.reply("data connect 시작")
	
	var datapage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
		.ignoreContentType(true)
		.get()
		//replier.reply("data connect 완료")
	
	//검색된 종목 이름
    var searchstockname =datapage
        .select("div.oPhL2e") + ""; // 문자열로 바꿔 주기 위해 + ""
		
	if (searchstockname == ""){
		replier.reply(stockname + "의 주가를 찾을 수 없습니다.")
		return 0
	}
	//replier.reply("종가 data 완료")
    searchstockname = searchstockname.replace(/<[^>]+>/g, "");
	searchstockname = searchstockname.replace(/\n/g, " ");	
	//검색된 종목 종류
    var searchstockcategori =datapage
        .select("div.HfMth") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockcategori = searchstockcategori.replace(/<[^>]+>/g, "");
	searchstockcategori = searchstockcategori.replace(/\n/g, " ");
	var stockcode1 = searchstockcategori.split(" ")
	var stockcode2 = stockcode1[3]

	//검색된 종목 최종 주가 날짜
    var searchstockpricedate =datapage
        .select("span[jsname=ihIZgd]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")
    searchstockpricedate = searchstockpricedate.replace(/<[^>]+>/g, "");
	
	//검색된 종목 화폐
    var exchange =datapage
        .select("span.knFDje") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    exchange = exchange.replace(/<[^>]+>/g, "");
	exchange = exchange.replace(/\n/g, " ");
	
	
	//검색된 종목 최종 주가
    var searchstockprice =datapage
        .select("span.IsqQVc.NprOob") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockprice = searchstockprice.replace(/<[^>]+>/g, "");

	//검색된 종목 최종 주가 증가
    var searchstockpricevariance =datapage
        .select("span[jsname=qRSVye]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpricevariance = searchstockpricevariance.replace(/<[^>]+>/g, "");
	searchstockpricevariance = searchstockpricevariance.replace(/\n/g, " ");
	
	//검색된 종목 최종 주가 증가 퍼센티지
    var searchstockpricevariancepercentage =datapage
        .select('span[jsname=rfaVEf]') + ""; // 문자열로 바꿔 주기 위해 + ""
		
    searchstockpricevariancepercentage = searchstockpricevariancepercentage.replace(/<[^>]+>/g, "");
	searchstockpricevariancepercentage = searchstockpricevariancepercentage.split("\n")
	searchstockpricevariancepercentage = searchstockpricevariancepercentage[0]


	//검색된 종목 프리/애프터 주가
    var searchstockpreafterprice =datapage
        .select("span[jsname=wurNO]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterprice = searchstockpreafterprice.replace(/<[^>]+>/g, "");
	
	if (searchstockpreafterprice == ""){
		//출력 메세지
		var searchstockDividendYield =datapage
        .select("td.iyjjgb") + ""; // 문자열로 바꿔 주기 위해 + ""
		//replier.reply("종가 data 완료")

		searchstockDividendYield = searchstockDividendYield.replace(/<[^>]+>/g, "");
		searchstockDividendYield = searchstockDividendYield.split("\n");
		searchstockDividendYield = searchstockDividendYield[5]
		
		var infomsg = 
		"[" + searchstockname +"]" + "\n" + 
		searchstockcategori + "\n" +
		"[" + searchstockpricedate+"]" + "\n" +
		exchange + searchstockprice + ", " + searchstockpricevariance+searchstockpricevariancepercentage +"\n" +
		"[ Dividend yield ] : " + searchstockDividendYield + "\n";


		replier.reply(infomsg);
		return 0;
	}
	
	//검색된 종목 프리/애프터 주가 증가
    var searchstockpreafterpricevariance =datapage
        .select("span[jsname=TmYleb]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterpricevariance = searchstockpreafterpricevariance.replace(/<[^>]+>/g, "");

	//검색된 종목 프리/애프터 주가 증가 퍼센티지
    var searchstockpreafterpricevariancepercentage =datapage
        .select("span[jsname=sam3Lb]") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockpreafterpricevariancepercentage = searchstockpreafterpricevariancepercentage.replace(/<[^>]+>/g, "");
	//검색된 종목 배당수익률
    var searchstockDividendYield =datapage
        .select("td.iyjjgb") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    searchstockDividendYield = searchstockDividendYield.replace(/<[^>]+>/g, "");
	searchstockDividendYield = searchstockDividendYield.split("\n");
	searchstockDividendYield = searchstockDividendYield[5]


	//출력 메세지
    var infomsg = 
	"[" + searchstockname +"]" + "\n" + 
	" "+ searchstockcategori + "\n" +
	"[" + searchstockpricedate+"]" + "\n" +
	exchange + searchstockprice + ", " + searchstockpricevariance+searchstockpricevariancepercentage +"\n" +
	"[ Pre & After Market ]" + "\n" +
	exchange + searchstockpreafterprice +", "+ searchstockpreafterpricevariance + " " + searchstockpreafterpricevariancepercentage + "\n" + 
	"[ Dividend yield ] : " + searchstockDividendYield + "\n";

    replier.reply(infomsg);
  }
}