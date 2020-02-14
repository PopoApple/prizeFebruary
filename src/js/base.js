(function (global) {
    function remChange() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
    }
    remChange();
    global.addEventListener('resize', remChange, false);  
})(window);


