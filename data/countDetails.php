<?php
	header('Content-Type:application/json');
	$output=['msg'=>'','sum'=>'','balance'=>'','total'=>'','interest'=>''];
	$phone=$_REQUEST['phone'];
	$conn=mysqli_connect('127.0.0.1','root','','rong',3306);
	$sql="SELECT user_name,user_sum,user_balance,user_total,user_interest FROM usermoney WHERE user_name='$phone'";
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$output['msg']=$row['user_name'];
	$output['sum']=$row['user_sum'];
	$output['balance']=$row['user_balance'];
	$output['total']=$row['user_total'];
	$output['interest']=$row['user_interest'];
	echo json_encode($output);
?>