<?php
	header('Content-Type:application/json');
	$output=['balance'=>''];
	$phone=$_REQUEST['phone'];
	$money=$_REQUEST['money'];
	$conn=mysqli_connect('127.0.0.1','root','','rong',3306);
	$sql="SELECT user_balance FROM usermoney WHERE user_name='$phone'";
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$bal=$row['user_balance'];
	$moneyt=floatval($money)*2+floatval($bal);
	$sqlt="UPDATE usermoney SET user_balance='$moneyt' WHERE user_name='$phone'";
	$tresult=mysqli_query($conn,$sqlt);
	$output['balance']=$moneyt;
	echo json_encode($output);
?>