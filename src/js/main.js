var origin = 'https://capp01.189.cn:6443';  //测试
//var origin = 'https://wapmkt.189.cn:7443';  //生产
var ticket = _Utils.getQueryParam('ticket');
var system = _Utils.getSystemInfo();
var backLink = origin + '/grep/prizeFebruary/index.html';
console.log('origin-----------', origin);
console.log('ticket-----------', ticket);
console.log('system-----------', system);
console.log('backLink-----------', backLink);
$(function () {
    $.ajax({
        type: 'GET',
        url: origin + '/grep/Coupon/api/getAceess.do',
        dataType: 'json',
        success: function (res) {
            $('.wrapper').css({ 'display': 'block' });
            if (res.result === '10000') {
                $('.block-main').attr('class', 'block-main block-main-payed');
            } else if (res.result === '-10005') {
                $('.block-main').attr('class', 'block-main block-main-geted');
            }
        },
        error: function () {
            _Utils.showToast('网络出现异常，请稍后重试');
        }
    });
});
function onBtnRulesClick () {
    $(window).scrollTop($(document).height());
}
function onBtnRechargeClick() {
    try {
        trk_wap_jt.trkAppButtonClick("立即充值","pinganchongzhi-sy-cz-0_1","","","");
    } catch (e) {}
    goRechargePage();
}
function goRechargePage () {
    var linkType = '1';
    var title = '话费充值';
    if (system.isIos) { 
        _Utils.iosGoLink(linkType, '121', backLink + '?ticket=' + ticket, title); 
    } else { 
        _Utils.androidGoLink(linkType, '30001', backLink, title) 
    }
}
function onBtnGetRechargedClick () {
    try {
        trk_wap_jt.trkAppButtonClick("领取话费购商城优惠券","pinganchongzhi-sy-cz-0_2","","","");
    } catch (error) {}
    getEnvelope();
}
function onBtnGetClick () {
    try {
        trk_wap_jt.trkAppButtonClick("立即领取","pinganchongzhi-sy-cz-0_1","","","");
    } catch (error) {}
    getEnvelope();
}
function getEnvelope() {
    _Utils.showLoading();
    $.ajax({
        type: 'GET',
        url: origin + '/grep/Coupon/api/getEnvelope.do',
        dataType: 'json',
        data: {
            clientType: system.isIos ? '-20030' : '-20020'
        },
        success: function (res) {
            _Utils.hideLoading();
            switch (res.result) {
                case '10000':
                    $('.block-main').attr('class', 'block-main block-main-geted');
                    _Utils.showConfirm({
                        info: '恭喜您获得话费购商城',
                        tips: '*此抵扣券仅限权益券支付时使用',
                        importantInfo: '3元抵扣券',
                        okBtnType: 'use',
                        onOk: function () {
                            try {
                                trk_wap_jt.trkAppButtonClick("前往使用","pinganchongzhi-sy-tanch-0_1","","","");
                            } catch (error) {}
                            goShopingMall();
                        }, 
                        onCancel: function () {
                            try {
                                trk_wap_jt.trkAppButtonClick("前往使用-关闭","pinganchongzhi-sy-tanch-0_2","","","");
                            } catch (error) {}
                        }
                    });
                    break;
                case '-10001':
                    _Utils.showToast('请在客户端登录后重新尝试');
                    break;
                case '-10004':
                    _Utils.showConfirm({
                        info: '很抱歉未查询到您的充值记录，请充值成功后领取',
                        okBtnType: 'recharge',
                        onOk: goRechargePage
                    });
                    break;
                case '-10005':
                    $('.block-main').attr('class', 'block-main block-main-geted');
                    _Utils.showConfirm({
                        info: '您已领取过此权益抵扣券',
                        okBtnType: 'shopping',
                        onOk: goShopingMall 
                    });
                    break;
                default:
                    _Utils.showToast('领取失败，请稍后重试');
            }
        },
        error: function () {
            _Utils.hideLoading();
            _Utils.showToast('网络出现异常，请稍后重试');
        }               
    });
}
function onBtnGoShoppingClick () {
    try {
        trk_wap_jt.trkAppButtonClick("点击前往话费购商城查看","pinganchongzhi-sy-cz-0_1","","","");
    } catch (error) {}
    goShopingMall();
}
function goShopingMall () {
    var link = 'https://e.189.cn/store/wap/newcoupon/index.html?t=huango-hfg#/couponOrder';
    goH5Page(link, '话费购商城-优惠券列表页');
}
function onBanner4To5Click () {
    try {
        trk_wap_jt.trkAppButtonClick("领话费升5G","pinganchongzhi-sy-btmad-1_1","","","");
    } catch (error) {}
    var link = 'https://pms.189.cn/cljy-web/static/ysns5g/ysns5g_huango_index.html?cmpid=cj-ysn-015';
    goH5Page(link, '领话费升5G');
}
function onBannerSignInClick () {
    try {
        trk_wap_jt.trkAppButtonClick("签到薅话费","pinganchongzhi-sy-btmad-1_2","","","");
    } catch (error) {}
    var link = 'https://wapside.189.cn:9001/resources/dist/signInActivity.html?ticket=$ticket$&version=$version$&cmpid=khd-sign-czylhdy';
    goH5Page(link, '签到薅话费');
}
function goH5Page (link, title) {
    var linkType = '5';
    if (system.isIos) { 
        _Utils.iosGoLink(linkType, link, backLink + '?ticket=' + ticket, title);
    } else { 
        _Utils.androidGoLink(linkType, link, backLink, title);
    }
}