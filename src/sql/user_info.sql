CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `name` varchar(255) DEFAULT NULL,     # 用户名
  `password` varchar(255) NOT NULL, # 密码
  `email` varchar(255) NOT NULL,    # 邮箱地址
  `gender` varchar(255) DEFAULT NULL,     # 性别
  `birthday` varchar(255) DEFAULT NULL,     # 出生日期
  `home_address` longtext DEFAULT NULL,  # 详细信息
  `create_time` varchar(20) DEFAULT NULL,   # 创建时间
  `modified_time` varchar(20) DEFAULT NULL, # 修改时间
  `level` int(11) DEFAULT NULL, # 权限级别
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息
INSERT INTO `user_info` set name='admin', email='admin@gmail.com', password='123456',level='1';