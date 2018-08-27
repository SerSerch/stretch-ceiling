<?
$GKF = +$_COOKIE["gkf"] | 0;
if((isset($_GET['name'])&&$_GET['name']!="")&&(isset($_GET['phone'])&&$_GET['phone']!="") && $GKF <= 3) { //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'eduard.koshlan@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Обратный звонок'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_GET['name'].'</p>
                        <h3>Телефон: <a href="tel:'.$_GET['phone'].'">'.$_GET['phone'].'</a></h3>
						<br>
						<p>IP: '.$_SERVER['REMOTE_ADDR'].'</p>
						<p>Time: '.date("H:i:s").'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: <eduard.koshlan@yandex.ru>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
		setcookie("gkf", ++$GKF ,time()+3600);
		echo("1");
} else {
	echo("2");
}
?>