<?php 
	// 获取请求中的参数数据
	$email = $_POST["email"];
	$password = md5($_POST["password"]);

	/* 连接数据库，验证用户名与密码 */
	// 连接数据库服务器
	mysql_connect("localhost:3306", "root", "");
	// 选择使用的数据库
	mysql_select_db("project");
	// 创建 sql 语句
	$sql = "SELECT * FROM users WHERE email='". $email ."' AND password='". $password ."'";
	// echo $sql;
	// 执行sql语句：SELECT查询会返回查询结果集(虚拟表)
	$result = mysql_query($sql);
	// 处理执行结果
	if (mysql_num_rows($result) === 1) {
		$arr = array("code"=>200);
		$data = array("status" => 1, "message" => "用户登录成功");
		$arr["data"] = $data;
		echo json_encode($arr);
	} else {
		$arr = array("code"=>200);
		$data = array("status" => 0, "message" => "用户名或密码错误");
		$arr["data"] = $data;
		echo json_encode($arr);
	}
	// 关闭连接
	mysql_close();
 ?>