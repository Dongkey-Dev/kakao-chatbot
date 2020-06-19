 function response(room, msg, sender, isGroupChat, replier, ImageDB) {	
  if (msg == "국장" ) {

    var qurryURL = "https://finance.naver.com/sise/";

	// replier.reply("data connect 시작")
	
	var datapage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
		.ignoreContentType(true)
		.get()
	// replier.reply(datapage)
		
	// 코스피 코스닥 등락 퍼센티지 
    var kospi =datapage
     .select("span[id$=KOSPI_now]") + " " ; // 문자열로 바꿔 주기 위해 + ""
	kospi = kospi.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    kospi = kospi.replace(/\n/g, " "); // 엔터 제거
	
	var kospi_ch = datapage
     .select("span[id$=KOSPI_change]") + " " ; // 문자열로 바꿔 주기 위해 + ""
	kospi_ch = kospi_ch.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    kospi_ch = kospi_ch.replace(/\n/g, " "); // 엔터 제거
	
	var kosdaq = datapage
	 .select("span[id$=KOSDAQ_now]") + " " ; // 문자열로 바꿔 주기 위해 + ""
	kosdaq = kosdaq.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    kosdaq = kosdaq.replace(/\n/g, " "); // 엔터 제거
	
	var kosdaq_ch =datapage
	 .select("span[id$=KOSDAQ_change]") + " " ; // 문자열로 바꿔 주기 위해 + ""
	kosdaq_ch = kosdaq_ch.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    kosdaq_ch = kosdaq_ch.replace(/\n/g, " "); // 엔터 제거
	
	// 코스피 코스닥 개인 외인 기관 등락 퍼센티지 
    var updown =datapage
     .select("div[class$=lft]")
	 
	var gaemi = updown.select("li[class$=c2]")+ " " ; // 문자열로 바꿔 주기 위해 + ""
	gaemi = gaemi.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    gaemi = gaemi.replace(/\n/g, " "); // 엔터 제거
	gaemi = gaemi.split(" ");
	
	var fore = updown.select("li[class$=c3]")+ " " ; // 문자열로 바꿔 주기 위해 + ""
	fore = fore.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    fore = fore.replace(/\n/g, " "); // 엔터 제거
	fore = fore.split(" ");
	
	var gigwan = updown.select("li[class$=c4]")+ " " ; // 문자열로 바꿔 주기 위해 + ""
	gigwan = gigwan.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    gigwan = gigwan.replace(/\n/g, " "); // 엔터 제거
	gigwan = gigwan.split(" ");
	//date = date.split(" ");
	
	replier.reply(
	"코스피: " + kospi
	+kospi_ch.substring(kospi_ch.indexOf(" "),kospi_ch.indexOf("상")) + "\n"
	+ gaemi[0] +"\n" +
	fore[0] + "\n" + 
	gigwan[0] + "\n" 
	+ "\n" +	
	"코스닥: " + kosdaq 
	+kosdaq_ch.substring(kosdaq_ch.indexOf(" "),kosdaq_ch.indexOf("상")) + "\n" 
	+ gaemi[1] +"\n" +
	fore[1] + "\n" + 
	gigwan[1]
	
	)

  }
}