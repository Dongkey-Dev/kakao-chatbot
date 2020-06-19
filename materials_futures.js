function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (msg == "원자재") {
    var incidiesURL = "https://www.investing.com/commodities/real-time-futures";
	
	//replier.reply("data connect 시작")
	
	var incidata = org.jsoup.Jsoup.connect(incidiesURL) // 차트 data
		.ignoreContentType(true)
		.get()
		//replier.reply("data connect 완료")
	
	//금
    var golddata =incidata
        .select("td.pid-8830-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    golddata = golddata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var golddatasupport =incidata
        .select("td.pid-8830-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    golddatasupport = golddatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    golddatasupport = golddatasupport.replace(/\n/g, " "); // 엔터 제거
	
	golddata = golddata.split('\n')
	golddatasupport = golddatasupport.split(' ')
	
	//은
    var silverdata =incidata
        .select("td.pid-8836-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    silverdata = silverdata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var silverdatasupport =incidata
        .select("td.pid-8836-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    silverdatasupport = silverdatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    silverdatasupport = silverdatasupport.replace(/\n/g, " "); // 엔터 제거
	
	silverdata = silverdata.split('\n')
	silverdatasupport = silverdatasupport.split(' ')
	
	//팔라듐
    var palladiumdata =incidata
        .select("td.pid-8883-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    palladiumdata = palladiumdata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var palladiumdatasupport =incidata
        .select("td.pid-8883-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    palladiumdatasupport = palladiumdatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    palladiumdatasupport = palladiumdatasupport.replace(/\n/g, " "); // 엔터 제거
	
	palladiumdata = palladiumdata.split('\n')
	palladiumdatasupport = palladiumdatasupport.split(' ')
	
	//WTI유
    var wtidata =incidata
        .select("td.pid-8849-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    wtidata = wtidata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var wtidatasupport =incidata
        .select("td.pid-8849-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    wtidatasupport = wtidatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    wtidatasupport = wtidatasupport.replace(/\n/g, " "); // 엔터 제거
	
	wtidata = wtidata.split('\n')
	wtidatasupport = wtidatasupport.split(' ')
	
	//BRENT유
    var brentdata =incidata
        .select("td.pid-8833-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    brentdata = brentdata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var brentdatasupport =incidata
        .select("td.pid-8833-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    brentdatasupport = brentdatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    brentdatasupport = brentdatasupport.replace(/\n/g, " "); // 엔터 제거
	
	brentdata = brentdata.split('\n')
	brentdatasupport = brentdatasupport.split(' ')
	
	//NATURAL유
    var naturaldata =incidata
        .select("td.pid-8862-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    naturaldata = naturaldata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var naturaldatasupport =incidata
        .select("td.pid-8862-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    naturaldatasupport = naturaldatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    naturaldatasupport = naturaldatasupport.replace(/\n/g, " "); // 엔터 제거
	
	naturaldata = naturaldata.split('\n')
	naturaldatasupport = naturaldatasupport.split(' ')
	
	//출력 메세지
    var incimsg = 
	"            "+"[원자재]" + "\n" + 
	"$WTI유 (" + wtidata[0] + " " + wtidatasupport[0]+")" + "\n" +
	"$브렌트유 (" + brentdata[0] + " " + brentdatasupport[0]+")" + "\n" +
	"$천연가스 (" + naturaldata[0] + " " + naturaldatasupport[0]+")" + "\n" +
	"$금 (" + golddata[0] + " " + golddatasupport[0]+")" + "\n" +
	"$은 (" + silverdata[0] + " " + silverdatasupport[0]+")" + "\n" +
	"$팔라듐 (" + palladiumdata[0] + " " + palladiumdatasupport[0]+")" + "\n" +
	"";

    replier.reply(incimsg);
  }
}