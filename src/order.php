<?php
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['id-system'])) {$id_system = $_POST['id-system'];}
if (isset($_POST['inn'])) {$inn = $_POST['inn'];}
if (isset($_POST['ur'])) {$ur = $_POST['ur'];}
if (isset($_POST['kpp'])) {$kpp = $_POST['kpp'];}
if (isset($_POST['address'])) {$address = $_POST['address'];}
if (isset($_POST['choise-tariff'])) {$choise_tariff = $_POST['choise-tariff'];}
if (isset($_POST['choise-months'])) {$choise_months = $_POST['choise-months'];}
if (isset($_POST['choise-peoples'])) {$choise_people = $_POST['choise-peoples'];}
if (isset($_POST['choise-coupon'])) {$choise_coupon = $_POST['choise-coupon'];}
$message;


$subject = "Запись на вебинар с сайта oinz.ru";

if ($name) {
	$message .= "Имя: $name";
}
if ($phone) {
	$message .= "\nТелефон: $phone";
}


if ($id_system) {
	$message .= "\nID системы: $id_system";
}
if ($inn) {
	$message .= "\nИНН: $inn";
}

if ($ur) {
	$message .= "\nЮр. адрес: $ur";
}

if ($kpp) {
	$message .= "\nКПП: $kpp";
}

if ($address) {
	$message .= "\nАдрес для корреспонденции: $address";
}

if ($choise_tariff) {
	$message .= "\nВыбранный тариф: $choise_tariff";
	$subject = "Заявка с сайта oinz.ru - Лицензии";
}

if ($choise_months) {
	$message .= "\nКоличество месяцев: $choise_months";
}

if ($choise_people) {
	$message .= "\nКоличество человек: $choise_people";
}
if ($coupon) {
	$message .= "\nКупон: $coupon";
}

$to = "admin@oinz.ru";
// $to = "e5ash.bro@gmail.com";
$headers = "Content-type: text/plain; charset = UTF-8";

$send = mail($to, $subject, $message, $headers);
?>