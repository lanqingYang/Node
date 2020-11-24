function ajax(options) {
    var defaults = {
      type: "get",
      url: null,
      dataL: null,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function () {},
      error: function () {},
    };

    //对象覆盖 实现用户传递的参数就用用户传递的，用户未传递的就用默认的
    //使用defaults对象中的属性覆盖options对象中的属性  ，会影响defaults中的值，所以不用接收和赋值
    Object.assign(defaults, options);

    //创建ajax对象
    var xhr = new XMLHttpRequest();

    //拼接请求对象参数的变量
    var params = "";
    for (var attr in defaults.data) {
      //将参数转换为字符串格式
      params += attr + "=" + defaults.data[attr] + "&";
    }
    //截取字符串 去掉最后一个 ‘&’
    params = params.substr(0, params.length - 1);
    // console.log(params);

    //判断请求方式
    if (defaults.type == "get") {
      defaults.url += "?" + params;
    }

    //配置ajax对象
    xhr.open(defaults.type, defaults.url);
    //发送请求
    if (defaults.type == "post") {
      var contentType = defaults.header["Content-Type"];
      //设置请求参数格式的类型
      xhr.setRequestHeader("Content-Type", defaults.header["Content-Type"]);
      //判断请求参数格式的类型
      if (contentType == "application/json") {
        //如果类型为json，就向服务器端传递json数据格式的参数
        xhr.send(JSON.stringify(defaults.data));
      } else {
        //不是json ，向服务器端传递普通类型的请求参数
        xhr.send(params);
      }
    } else {
      xhr.send();
    }

    //获取响应数据
    xhr.onload = function () {
      //获取响应头中的数据
      var contentType = xhr.getResponseHeader("Content-Type");
      var responseText = xhr.responseText;
      //如果响应类型中包含application/json
      if (contentType.includes("application/json")) {
        //如果是json类型的字符串，就把他转换为json对象
        responseText = JSON.parse(responseText);
      }

      //当http状态码==200
      if (xhr.status == 200) {
        //请求成功 调用处理成功的函数
        defaults.success(responseText, xhr);
      } else {
        //请求失败 调用处理失败的函数
        defaults.error(responseText, xhr);
        console.log(xhr);
      }
    };
  }
