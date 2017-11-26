
var ua = navigator.userAgent;

var client = function () {

    var engine = {
        //呈现引擎
        ie:0,
        gecko:0,
        webkit:0,
        khtml:0,
        opera:0,
        //具体的版本号
        ver:null
    };

    var browser = {

        //浏览器
        ie: 0,
        firefox: 0,
        chrome: 0,
        safari: 0,
        opera: 0,
        konq:0,
        //具体的版本号
        ver:null
    };

    var system = {
        win:false,
        mac:false,
        x11:false,

        //移动设备
        iphone:false,
        ipod:false,
        ipad:false,
        ios:false,
        android:false,
        nokiaN:false,
        winMobile:false,

        //游戏主机
        wii:false,
        ps:false
    }

    if(window.opera){
        //opera会伪装自己，因此通过判断是否存在window.opera对象来判断
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    }
    else if(/AppleWebKit\/(\S+)/.test(ua)){
        //识别WebKit，它是Chrome和Safari的呈现引擎
        engine.ver = RegExp['$1'];
        engine.webkit = parseFloat(engine.ver);

        //Chrome 还是 Safari
        if(/Chrome\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.chrome = parseFloat(browser.ver);
        }
        else if(/Version\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.safari = parseFloat(browser.ver);
        }
        else{
            //近似确认版本号
            var safariVersion = 1;
            if(engine.webkit < 100){
                safariVersion = 1;
            }
            else if(engine.webkit < 312){
                safariVersion = 1.2;
            }
            else if(engine.webkit < 412){
                safariVersion = 1.3
            }
            else{
                safariVersion = 2
            }
        }
        browser.safari = browser.ver = safariVersion;
    }
    else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        //Konqueror是基于KHTML开源呈现引擎的浏览器，只能在Linux中使用
        engine.ver = browser.ver = RegExp['$1'];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    }
    else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        //Gecko是FireFox的呈现引擎
        engine.ver = RegExp['$1'];
        engine.gecko = parseFloat(engine.ver);

        //是否是FireFox
        if(/Firefox\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.firefox = parseFloat(browser.ver);
        }
    }
    else if(/MSIE ([^;]+)/.test(ua)){
        //IE， 呈现引擎是Trident
        engine.ver = browser.ver = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }


    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || p.indexOf('Linux') == 0;

    //Windows
    if(system.win){

        if(/Win(?:dos)?([^do]{2})\s?(\d+\.\d+)/.test(ua)){
            if(RegExp['$1'] == 'NT'){
                switch(RegExp['$2']){
                    case '5.0':
                        system.win = '2000';
                        break;
                    case '5.1':
                        system.win = 'XP';
                        break;
                    case '6.0':
                        system.win = 'Vista';
                        break;
                    case '6.1':
                        system.win = '7';
                        break;
                    default:
                        system.win = 'NT';
                        break;
                }
            }
            else if(RegExp['$1'] == '9x'){
                system.win = 'ME';
            }
            else{
                system.win = RegExp['$1'];
            }
        }
    }

    system.iphone = ua.indexOf('iphone') > -1;
    system.ipod = ua.indexOf('iPod') > -1;
    system.ipad = ua.indexOf('iPad') > -1;
    system.nokiaN = ua.indexOf('NokiaN') > -1;

    if(system.win == 'CE'){
        system.winMobile = system.win;
    }
    else if(system.win == 'Ph'){
        if(/Windows Phone OS (\d+\.\d+)/.test(ua)){
            system.win = 'Phone';
            system.winMobile = parseFloat(RegExp['$1']);
        }
    }

    if(system.mac && ua.indexOf('Mobile') > -1){
        if(/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)){
            system.ios = parseFloat(RegExp.$1.replace('_','.'));
        }
        else {
            system.ios = 2;
        }
    }

    if(/Android (\d+\.\d+)/.test(ua)){
        system.android = parseFloat(RegExp['$1']);
    }

    system.wii = ua.indexOf('Wii') > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine:engine,
        browser:browser,
        system:system
    }
}();
