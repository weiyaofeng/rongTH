<?php
	header('Content-Type:application/json');

	$output=[];
	$output[]=['name'=>11.1,'valueO'=>60,'valueT'=>180];
	$output[]=['name'=>11.4,'valueO'=>80,'valueT'=>200];
	$output[]=['name'=>11.7,'valueO'=>220,'valueT'=>360];
	$output[]=['name'=>11.10,'valueO'=>100,'valueT'=>300];
	$output[]=['name'=>11.13,'valueO'=>50,'valueT'=>280];
	$output[]=['name'=>11.16,'valueO'=>200,'valueT'=>400];
	$output[]=['name'=>11.19,'valueO'=>80,'valueT'=>300];
	$output[]=['name'=>11.22,'valueO'=>180,'valueT'=>260];
	$output[]=['name'=>11.25,'valueO'=>220,'valueT'=>480];
	$output[]=['name'=>11.28,'valueO'=>180,'valueT'=>380];

	echo json_encode($output);
?>