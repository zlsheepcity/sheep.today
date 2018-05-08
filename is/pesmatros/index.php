<!doctype html>
<html>
<head>
	<title>Пройти тест. Какой вы Пёс-Матрос?</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content=""/>
	<meta name="keywords" content=""/>	

    <meta name="author" content="zl-12з" />


    <!-- FAVICON -->

    <link rel="apple-touch-icon" href="../../app/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" href="../../app/favicons/android-icon-192x192.png">
    <link rel="manifest" href="../../app/favicons/manifest.json">
    <meta name="msapplication-TileColor" content="#FFCC01">
    <meta name="msapplication-TileImage" content="../../app/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#FFCC01">
    
    <!-- SOCIAL -->

    <meta property="og:title" content="Пройти тест. Какой вы Пёс-Матрос?" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="" />
    <meta property="og:url" content="http://sheep.today/is/pesmatros/" />
    <meta property="og:image" content="http://sheep.today/is/pesmatros/bandos.png" />
    <meta property="og:image:width" content="200" />
    <meta property="og:image:height" content="200" />
    <meta property="og:locale" content="ru_RU" />

    <link href="main.css" rel="stylesheet" media="all">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/social-likes/dist/social-likes_birman.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/social-likes/dist/social-likes.min.js"></script>
    
    
</head>
<body>
<div id="quiz">
<?php

$homeURL = 'http://sheep.today/is/pesmatros/';
	
	if (isset($_GET["quiz"])) {
	
		$qq1 = !isset($_GET["q1"]) || (int)$_GET["q1"]<1 || (int)$_GET["q1"]>3 ? 1 : (int)$_GET["q1"];
		$qq2 = !isset($_GET["q2"]) || (int)$_GET["q2"]<1 || (int)$_GET["q2"]>3 ? 1 : (int)$_GET["q2"];
		$qq3 = !isset($_GET["q3"]) || (int)$_GET["q3"]<1 || (int)$_GET["q3"]>3 ? 1 : (int)$_GET["q3"];
		$qq4 = !isset($_GET["q4"]) || (int)$_GET["q4"]<1 || (int)$_GET["q4"]>3 ? 1 : (int)$_GET["q4"];
		
		$answer = $qq1 + $qq4 * 10;
		
		$enemy = array(
			"11" => "21",
			"21" => "32",
			"31" => "33",
			
			"12" => "13",
			"22" => "11",
			"32" => "22",
			
			"13" => "21",
			"23" => "12",
			"33" => "31",
		);
		
		$friend = array(
			"11" => "13",
			"21" => "22",
			"31" => "32",
			
			"12" => "13",
			"22" => "21",
			"32" => "11",
			
			"13" => "31",
			"23" => "23",
			"33" => "12",
		);
		
		if ($qq2 == 2) $answer = $friend[$answer];
		if ($qq2 == 3) $answer = $enemy[$answer];
		
		$titles = array(
			"11" => "Галапагос",
			"21" => "в деревне рос",
			"31" => "большой босс",
			
			"12" => "кровосос",
			"22" => "состав под откос",
			"32" => "бандос",
			
			"13" => "Кейт Мосс",
			"23" => "дед-мороз",
			"33" => "молокосос",
		);
		
		$descriptions = array(
			"11" => "Морское ремесло вы выучили только лишь для того, чтобы добраться до райского необитаемого острова. Сжечь свой корабль, построить шалаш, налить коктейля, дождаться заката. И красота-а-а! Ваша стихия — нега и спа. Ваш знак зодиака — шезлонг. Купите себе таких два.",
			"21" => "Вы точно знаете, что червивая кукуруза хуже спелой малины, что Машка Забалайкина — самая красивая сучка, что весною сеют, а осенью жнут. С этой уверенностью вы идете по жизни семимильными шагами. И даже если судьба когда-нибудь забросит вас в большой город, превратит вас в эмо-менеджера среднего звена, то вы все равно никогда не расстанетесь с любимой уткой и граблями. Ваш знак зодиака — укроп.",
			"31" => "Всем уже все давно доказано. У кого самые большие яйца, чей рык надо исполнять беспрекословно, кто метит последним — ни один из этих щенков не осмелится возражать вашему авторитету. А помните как оно начиналось в 41-ом? А помните дефолт в 98-ом? Отсидку в четвертом? Э-э-эх, были времена... Все знаки зодиака — ваши.",
			
			"12" => "Когда триста лет назад вы всё еще были домашним псом, хозяева недоумевали «а почему это наш песик не бежит за осиновой палочкой?». Где теперь эти хозяева? Вы наблюдаете как сменяются поколения и эпохи. Вы видели войны, любовь и твин-пикс. Вы скопили огромные сокровища и бесценные реликвии. Но вам ведь не надо ни шоколада, ни мармелада? Бленд-а-мед — ваш знак зодиака.",
			"22" => "Отсупать некуда, Шарик, тест пройден. Позади москва и фейсбук. Высшее руководство уже отдало приказ о капитуляции, все меняют пароли на почту и заново регистрируются в твиттере. Но только вы не сдаетесь! Это в корне противоречит характеру и ваша война еще не окончена! До последнего патрона, до последнего волоса на хвосте, за всех щенков, за каждую низведенную блоху! Знаки зодиака вы закопали вместе с паспортом и орденами.",
			"32" => "Ваше имя Пират. Родители думали о романтике далеких морей, но увы до романтики вам еще далеко. С какого района? Каждая дворняга трепещит от страха, едва почуяв ваш запах. Ментовские бульдоги трусливо жмутся в свои будки. А говядина всегда свежая. И да, это именно у вас самые большие яйца. С какого района, я тебя спрашиваю? Какой знак зодиака?",
			
			"13" => "О да! Вы самая обожаемая и желанная сучка в округе. Да что там округа? Все журналы мира мечтают получить вас на свою обложку. Ваша жизнь блестит и звенит. Дорогие меха, брилиантовые ошейники, кожанные поводки. Вы умеете зажечь любую вечеринку — достаточно просто щелкнуть пальцами и одарить всех очаровательнейшей улыбкой. Это ваша жизнь. Это Вы! Ваш знак зодиака — Кейт Мосс.",
			"23" => "К сожалению, вам попалась самая дурацкая картинка из опроса «Какой вы Пёс-Матрос?». Но это ведь не страшно, да? Вы ведь думаете о себе в последнюю очередь, а куда важнее для вас счастье и радость других. И даже не важно кто эти другие — близкие люди, пробегающие мимо щенки или заматерелые уголовники. Каждый имеет право на небольшой подарочек, хотя бы раз в год. Ваш знак зодиака — мешок. Мешочек.",
			"33" => "Привет мелочь. Хочешь я расскажу тебе, кем ты вырастешь? А хочешь в угол поставлю? Поведение твое оставляет желать лучшего, того и гляди через пару лет снова пройдешь этот опрос и станешь Псом-Матросом-Бандосом. Лучше иди учись, станешь большим боссом. Хватит валять дурака, и откуда у тебя эти два синяка? Немедленно отдай рогатку и садись отгадывай загадку — Какой твой знак зодиака?",
		);	

		$images = array(
			"11" => "galapagos.gif",
			"21" => "v_derevne_ros.gif",
			"31" => "big_boss.gif",
			
			"12" => "krovosos.gif",
			"22" => "pod_otkos.gif",
			"32" => "bandos.gif",
			
			"13" => "keit_moss.gif",
			"23" => "ded_moroz.gif",
			"33" => "molokosos.gif",
		);	

		$html = '<table width="600" bgcolor="#992222" color="#000000" border="0" cellpadding="4" cellspacing="10"><tr><td bgcolor="#FFEEEE"><b>Вы — Пёс-Матрос '.$titles[$answer].'</b></td><td bgcolor="#000000" rowspan="2"><img src="'.$homeURL.$images[$answer].'" alt="'.$titles[$answer].'"/></td></tr><tr><td bgcolor="#FFEEEE" valign="top"><small>'.$descriptions[$answer].'</small></td></tr></table><div style="font-size:1.4em;">Пройти тест <a href="'.$homeURL.'">«Какой вы Пёс-Матрос?»</a></div>
		';
		
		print $html;

	
	}
	else include "quiz.php";

?>
</div>
<br/>

<blockquote>
            <div class="social-likes">
                <div data-service="facebook" title="Share link on Facebook">Facebook</div>
                <div data-service="twitter" title="Share link on Twitter">Twitter</div>
                <div data-service="pinterest" title="Share link on Pinterest" data-media="image link, required">Pinterest</div>
                <div data-service="vkontakte" title="Share link on Vkontakte">Vkontakte</div>
            </div>
</blockquote>


</body>
</html>