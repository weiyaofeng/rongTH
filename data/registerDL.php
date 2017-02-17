<?php
	header('Content-Type:application/json');
	$output=['status'=>0,'msg'=>''];
	$phone=$_REQUEST['phone'];
	$pwd=$_REQUEST['pwd'];
	$conn=mysqli_connect('127.0.0.1','root','','rong',3306);
	$sql="SELECT user_id FROM usermess WHERE user_name='$phone' AND user_pwd='$pwd'";
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row){
		$output['status']=intval($row['user_id']);
		$output['msg']=$phone;
		echo json_encode($output);
	}
	else{
		$output['status']=-404;
		echo json_encode($output);
	}
?>