var _Utils = {
  // 获取url参数
  getQueryParam: function (key){
    var query = window.location.search.substring(1);
    var params = query.split('&');
    for (var i = 0; i < params.length; i++) {
      var pair = params[i].split('=');
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  },
  //获取系统信息
  getSystemInfo: function () {
    var ua = navigator.userAgent;
    var clientVersion = '';
    var uaArr = ua.split(';');
    var index = uaArr.indexOf('CtClient');
    if (index >= 0) {
      clientVersion = uaArr[index + 1];
    }
    return {
      isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
      clientVersion: 'v' + clientVersion
    };
  },
  //ios跳页面
  iosGoLink: function (linkType, link, backLink, title) {
    console.log('----------ios跳页面:linkType, link, backLink, title', linkType, link, backLink, title);
    window.location.href = 'objc://goLink?linkType=' + encodeURIComponent(linkType) + 
      '&Link=' + encodeURIComponent(link) + 
      '&backLink=' + encodeURIComponent(backLink) +
      '&title=' + encodeURIComponent(title);
  },
  //android跳页面
  androidGoLink: function (linkType, link, backLink, title) {
    console.log('----------android跳页面:linkType, link, backLink, title', linkType, link, backLink, title);
    CtclientJS.goLink(linkType, link, backLink, title);
  },
  // 显示确认框
  showConfirm: function (options) {
    var $confirm = $(
      '<div class="confirm">' +
        '<div class="confirm-content">' +
            '<div class="confirm-info"></div>' +
            '<div class="confirm-btn-ok"></div>' +
            '<div class="confirm-btn-cancel"></div>' +
        '</div>' +
      '</div>'
    );
    $('body').append($confirm).css({ overflow: 'hidden' });
    var info = options.info;
    var okBtnType = options.okBtnType;
    var onOk = options.onOk;
    var onCancel = options.onCancel;
    $('.confirm-info').text(info);
    $('.confirm-btn-ok').addClass('confirm-btn-ok-' + okBtnType).on('click', function () {
      $confirm.remove();
      $('body').css({ overflow: 'auto' });
      onOk && onOk();
    });;
    $('.confirm-btn-cancel').on('click', function () {
      $confirm.remove();
      $('body').css({ overflow: 'auto' });
      onCancel && onCancel();
    });
  },
  //轻提示
  showToast: function (content) {
    var $toast = $('<div class="toast"><span class="toast-content"></span></div>');
    $('body').append($toast);
    $('.toast-content').html(content);
    setTimeout(function() {
      $toast.css({ opacity: '0.9' });
      setTimeout(function () {
        $toast.remove();
      }, 2000);
    });
  },
  //显示加载框
  showLoading: function () {
    var $loading = $(
      '<div class="loading">' +
        '<div class="loading-box">' +
          '<div class="loading-icon"></div>' +
        '</div>' +
      '</div>' 
    );
    $('body').append($loading).css({ overflow: 'hidden' });
  },
  //隐藏加载框
  hideLoading: function () {
    $('.loading').remove();
    $('body').css({ overflow: 'auto' });
  },
  //跳转客服页
  goServicePage: function () {
    window.location.href = 'http://xiaozhi.189.cn:8082/APPOnlineCustomer/servlet/DQ5G?params={%22applyCode%22:%22dq_chfxhl%22,%22province%22:%22%22,%22city%22:%22%22,%22business%22:%22TelecomRobot_HKZS%22,%22ptoken%22:%22%22,%22quest%22:%22%22}';
  }
}
$('body').append('<img src="./images/btn-service.png" class="common-img-service" onclick="_Utils.goServicePage()" />');