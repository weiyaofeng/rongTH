<?php
	header('Content-Type:application/json');
	$output=['msg'=>''];
	$phone=$_REQUEST['phone'];
	$pwd=$_REQUEST['pwd'];
	$conn=mysqli_connect('127.0.0.1','root','','rong',3306);
	$sql="INSERT INTO usermess VALUES(NULL,'$phone','$pwd')";
	$sqlt="INSERT INTO usermoney VALUES(NULL,'$phone',0,0,0,0)";
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	$resultt=mysqli_query($conn,$sqlt);

	$output['msg']=$phone;
	echo json_encode($output);
?>