function ajax(opts) {

    var defaults = {
        method: 'GET', //请求方式
        url: '', //发送请求的地址
        data: '', //发送数据
        async: true, //是否异步
        cache: true, //是否缓存
        contentType: 'application/x-www-form-urlencoded', //http头信息
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {},
    };

    //2.覆盖参数
    for (var key in opts) {
        defaults[key] = opts[key];
    };

    if (typeof defaults.data === 'object') {
        var str = '';
        for (var key in defaults.data) {
            str += key + '=' + defaults.data[key] + '&'
        }
        defaults.data = str.substring(0, str.length - 1);
    };

    defaults.method = defaults.method.toUpperCase();

    defaults.cache = defaults.cache ? '' : '&' + new Date().getTime();


    if (defaults.method === 'GET' && (defaults.data || defaults.cache)) {
        defaults.url += '?' + defaults.data + defaults.cache;
    };

    var oXhr = new XMLHttpRequest();

    oXhr.open(defaults.method, defaults.url, defaults.async);

    if (defaults.method === 'GET') {
        Object.keys(opts.headers).forEach((key) => {
            oXhr.setRequestHeader(key, opts.headers[key]);
        });
        oXhr.send(null);
    } else {
        //设置请求头
        Object.keys(opts.headers).forEach((key) => {
            oXhr.setRequestHeader(key, opts.headers[key]);
        });
        //OXhr.withCredentials = true;
        oXhr.send(defaults.data);
    }

    oXhr.onreadystatechange = function() {
        if (oXhr.readyState === 4) {
            if (oXhr.status === 200) {
                defaults.success.call(oXhr, oXhr.responseText); //oXhr.responseText
            } else {
                defaults.error();
            };
        };
    };

};


module.exports = ajax;