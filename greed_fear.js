 function response(room, msg, sender, isGroupChat, replier, ImageDB) {	
  if (msg == "공포"||msg=='탐욕' ) {

    var qurryURL = "https://money.cnn.com/data/fear-and-greed/";

	// replier.reply("data connect 시작")
	
	var datapage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
		.ignoreContentType(true)
		.get()
		
	// replier.reply(datapage)
		
    var num =datapage
     .select("div[id$=needleChart]").get(0) + " ";
	 num = num.split(" ");
	 
	var date = datapage
	.select("div[id$=needleAsOfDate]") + " ";
	date = date.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    date = date.replace(/\n/g, " "); // 엔터 제거
	 
	var ForG;
	if ('F' == num[18].substring(1,2)){
		ForG = " (Fear)"
	} else {
		ForG = " (Greed)"
	};
	replier.reply(
	"   " + num[17] + ForG + "\n" + 
	date
	);

  }
}