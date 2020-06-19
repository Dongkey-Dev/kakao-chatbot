function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (msg == "선물") {
    var incidiesURL = "https://kr.investing.com/indices/indices-futures";
	
	//replier.reply("data connect 시작")
	
	var incidata = org.jsoup.Jsoup.connect(incidiesURL) // 차트 data
		.ignoreContentType(true)
		.get()
		//replier.reply("data connect 완료")
	
	//S&P 500
    var sp500data =incidata
        .select("td.pid-8839-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    sp500data = sp500data.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var sp500support =incidata
        .select("td.pid-8839-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    sp500support = sp500support.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    sp500support = sp500support.replace(/\n/g, " "); // 엔터 제거
	
	sp500data = sp500data.split('\n')
	sp500support = sp500support.split(' ')
	
	//S&P VIX
    var vixdata =incidata
        .select("td.pid-8884-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    vixdata = vixdata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var vixdatasupport =incidata
        .select("td.pid-8884-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    vixdatasupport = vixdatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    vixdatasupport = vixdatasupport.replace(/\n/g, " "); // 엔터 제거
	
	vixdata = vixdata.split('\n')
	vixdatasupport = vixdatasupport.split(' ')
	
	//다우30
    var dow30data =incidata
        .select("td.pid-8873-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    dow30data = dow30data.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var dow30datasupport =incidata
        .select("td.pid-8873-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    dow30datasupport = dow30datasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    dow30datasupport = dow30datasupport.replace(/\n/g, " "); // 엔터 제거
	
	dow30data = dow30data.split('\n')
	dow30datasupport = dow30datasupport.split(' ')
	
	//나스닥
    var nasdata =incidata
        .select("td.pid-8874-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    nasdata = nasdata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var nasdatasupport =incidata
        .select("td.pid-8874-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    nasdatasupport = nasdatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    nasdatasupport = nasdatasupport.replace(/\n/g, " "); // 엔터 제거
	
	nasdata = nasdata.split('\n')
	nasdatasupport = nasdatasupport.split(' ')
	
	//코스피
    var kospidata =incidata
        .select("td.pid-8987-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    kospidata = kospidata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var kospidatasupport =incidata
        .select("td.pid-8987-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    kospidatasupport = kospidatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    kospidatasupport = kospidatasupport.replace(/\n/g, " "); // 엔터 제거
	
	kospidata = kospidata.split('\n')
	kospidatasupport = kospidatasupport.split(' ')
	
	//니케이
    var nikaidata =incidata
        .select("td.pid-8859-last") + ""; // 문자열로 바꿔 주기 위해 + ""
	//replier.reply("종가 data 완료")

    nikaidata = nikaidata.replace(/<[^>]+>/g, "");

	//replier.reply("증가분 data connect 시작")
    var nikaidatasupport =incidata
        .select("td.pid-8859-pcp") + ""; // 증가분 처리
	//replier.reply("증가분 data connect 완료")
		
    nikaidatasupport = nikaidatasupport.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    nikaidatasupport = nikaidatasupport.replace(/\n/g, " "); // 엔터 제거
	
	nikaidata = nikaidata.split('\n')
	nikaidatasupport = nikaidatasupport.split(' ')
	
	//출력 메세지
    var incimsg = 
	"           "+"[ 선물 ]" + "\n" + 
	"$나스닥 (" + nasdata[0] + " " + nasdatasupport[0]+")" + "\n" +
	"$S&P500 (" + sp500data[0] + " " + sp500support[0]+")" + "\n" +
	"$다우30 (" + dow30data[0] + " " + dow30datasupport[0]+")" + "\n" +
	"$   VIX   (" + vixdata[0] + " " + vixdatasupport[0]+")" + "\n" +
	
	"\n" + "$코스피250 (" + kospidata[0] + " " + kospidatasupport[0]+")" + "\n" +
	"";

    replier.reply(incimsg);
  }
}