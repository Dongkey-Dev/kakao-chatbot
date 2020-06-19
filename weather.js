 function response(room, msg, sender, isGroupChat, replier, ImageDB) {	
  if (msg == "날씨" ) {

    var qurryURL = "https://www.google.com/search?q=" + "날씨";

	//replier.reply("data connect 시작")
	

	
	var datapage = org.jsoup.Jsoup.connect(qurryURL) // 차트 data
		.ignoreContentType(true)
		.get()
	
	// 위치 
    var loc =datapage
     .select("div[class$=vk_h]")+" " ; // 문자열로 바꿔 주기 위해 + ""
	loc = loc.replace(/<[^>]+>/g, ""); // 태그 제거하고 안에 내용만 빼기, (다 제거)
    loc = loc.replace(/\n/g, " "); // 엔터 제거
	loc = loc.split(" ");
	loc = loc[2] + " " + loc[3] + "";
	
	var time = datapage
	.select("div[class$=vk_sh]").get(0)+" ";
	time = time.replace(/<[^>]+>/g, "");
	time = time.replace(/\n/g, " ");
	
	var weath = datapage
	.select("span[class$=vk_sh]").get(0)+" ";
	weath = weath.replace(/<[^>]+>/g, "");
	weath = weath.replace(/\n/g, " ");
	
	var cur_temp = datapage
	.select("span.wob_t").get(0) + " ";
	cur_temp = cur_temp.replace(/<[^>]+>/g, "");
	cur_temp = cur_temp.replace(/\n/g, " ");
	
	var high_temp = datapage
	.select("div.vk_gy").select("span.wob_t").get(2) + " ";
	high_temp = high_temp.replace(/<[^>]+>/g, "");
	high_temp = high_temp.replace(/\n/g, " ");
	
	var low_temp = datapage
		.select("div[class$=wob_ds]").select("span[class$=wob_t]").get(2) + " ";
	low_temp = low_temp.replace(/<[^>]+>/g, "");
	low_temp = low_temp.replace(/\n/g, " ");
	
	replier.reply("[ 날씨 : "+loc + " ]" + "\n" + time + ": " + cur_temp+"°C" + "\n" +  weath + "\n" +
	"최고기온 : " +  high_temp+ "°C" + "\n" +
	"최저기온 : " +  low_temp+ "°C" + "\n") 
  }
}