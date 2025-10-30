<!DOCTYPE html>
<html>
<head>

	<meta property="og:site_name" content="Revive Phone Repair">
	<meta property="og:title" content="Revive Phone Repair">
	<meta property="og:description" content="Revive Phone Repair">
	<meta property="og:url" content="http://www.revivephonerepair.com/">

	<meta name="description" content="Revive Phone Repair">
	<meta name="keywords" content="iphone repair mandeville, mandeville la cell phone repair, iphone fix, screen replacement, northshore iphone repair, iphone repair 70448, smart phone repairs, smart phone repair, cell phone repairs, smart phone screen replacement, smart phone buybacks,">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">


	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway:400,700|Coustard' rel='stylesheet' type='text/css'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title><?php echo $page_title;?></title>
	<link rel="stylesheet" type="text/css" href="/css/style.css">




	<link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="favicon/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="favicon/android-chrome-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="favicon/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="favicon/manifest.json">
	<link rel="mask-icon" href="favicon/safari-pinned-tab.svg">
	<link rel="shortcut icon" href="favicon/favicon.ico">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-TileImage" content="favicon/mstile-144x144.png">
	<meta name="msapplication-config" content="favicon/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">



</head>
<body>
	<div class="container">
		<h1 class="logo">
			<a href="/">
				<img alt="Revive Phone Repair Logo" src="/css/img/revivephonerepair-logo.png">
			</a>
			<span style="display:none;">Revive Phone Repair</span>
		</h1>
		<div class="header_navi">
			<div class="line">Line</div>


			<?php
			$navi_location = "$_SERVER[REQUEST_URI]";

			$pattern = '/.php/';
			$navi_location = preg_replace($pattern, "", $navi_location);
			$pattern = '/.html/';
			$navi_location = preg_replace($pattern, "", $navi_location);
			$pattern = '/\?thanks/';
			$navi_location = preg_replace($pattern, "", $navi_location);

			switch ($navi_location) {
				case '/contact': $navi = 5;break;
				case '/locations': $navi = 4;break;
				case '/services': $navi = 3;break;
				case '/about': $navi = 2;break;
				case '/': $navi = 1;break;
				default: $navi = 1;break;
			}

			?>
			<ul>
				<li <?php if($navi == 1){echo 'class="active"';} ?>><a href="/">Home</a></li>
				<li <?php if($navi == 2){echo 'class="active"';} ?>><a href="/about.php">About</a></li>
				<li <?php if($navi == 3){echo 'class="active"';} ?>><a href="/services.php">Services</a></li>
				<li <?php if($navi == 4){echo 'class="active"';} ?>><a href="/locations.php">Locations</a></li>
				<li <?php if($navi == 5){echo 'class="active"';} ?>><a href="/contact.php">Contact</a></li>
			</ul>
		</div>

		<div class="header_sub">
			<?php 
			switch ($navi) {
				case 5://contact
					echo '<h2>Contact Us</h2>';
					break;
				case 4://locations
					echo '<h2>Locations</h2>';
					break;
				case 3://services
					echo '<h2>Revive Services</h2>';
					break;
				case 2://about
					echo '<h2>About Us</h2>';
					break;
				default://home
					// '<a href="https://www.facebook.com/REViVEphonerepair"><img alt="Facebook" src="/css/img/facebook.png"></a>
					// <a href="https://twitter.com/REViVErepair"><img alt="Twitter" src="/css/img/twitter.png"></a>';

					echo '<a href="https://www.facebook.com/REViVEphonerepair"><img alt="Facebook" src="/css/img/facebook-blue-trans.png"></a>';
					// echo '<a href="https://twitter.com/REViVErepair"><img alt="Twitter" src="/css/img/twitter-blue-trans.png"></a>';
					echo '<a href="https://www.instagram.com/revivephonerepair/"><img alt="Instagram" src="/css/img/instagram.jpg"></a>';
					
					break;
			}


			?>
			
		</div>

















