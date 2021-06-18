class HashChange {
    constructor() {
        this.eventHandler = null;
    }
    postmessage(url) {
        window.wx.miniProgram.postMessage({
            data: {
                wxH5BackUrl: url,
                wxH5Back: `wxH5Back_${new Date().getTime()}`
            }
        });
    }
    addEventHashChange(callback) {
        this.eventHandler = function () {
            let hash = decodeURIComponent(location.hash);
            if (hash.includes(`#wxH5Back_`)) {
                callback && callback();
                history.go(-1);
            }
        };
        window.addEventListener('hashchange', this.eventHandler);
    }
    offEventtHashChange() {
        window.removeEventListener('hashchange', this.eventHandler);
    }
}

export default (new HashChange());