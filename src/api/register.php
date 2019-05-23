<?php
	// 获取请求中传递的参数
	$firstname = $_POST["firstname"];
	$lastname = $_POST["lastname"];
	$email = $_POST["email"];
	$password = md5($_POST["password"]);

	/* 将注册用户信息保存到数据库中 */
	// 连接数据库服务器
	// mysql_connect(服务器, 用户名, 密码)
	mysql_connect("localhost:3306", "root", "");
	// 选择所使用的数据库
	mysql_select_db("project");
	// 创建SQL语句
	$sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('". $firstname ."', '". $lastname ."', '". $email ."', '". $password ."')";
	// 执行SQL
	$result = mysql_query($sql);
	// 判断是否执行成功
	if ($result) {
		$arr = array("code"=>200);
		$data = array("status" => 1, "message" => "用户注册成功");
		$arr["data"] = $data;
		echo json_encode($arr);
	} else {
		$arr = array("code"=>200);
		$data = array("status" => 0, "message" => "用户注册失败：" . mysql_error() );
		$arr["data"] = $data;
		echo json_encode($arr);
	}
	// 关闭数据库连接
	mysql_close();
 ?>