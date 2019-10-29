var storageUtil = {
    /**
     * @param key
     * @param data
     * @param time 失效时间（秒）,默认一天
     * @returns {boolean}
     */
    setItem: function(key, data, time) {
        try {
            if (!localStorage) {
                return false;
            }
            if (!time || isNaN(time)) {
                time = 60 * 60 * 24;
            }
            var cacheExpireDate = new Date().getTime() + time * 1000;
            var cacheVal = { val: data, exp: cacheExpireDate };
            localStorage.setItem(key, JSON.stringify(cacheVal)); //存入缓存值
        } catch (e) {}
    },
    getItem: function(key) {
        try {
            if (!localStorage) {
                return false;
            }
            var cacheVal = localStorage.getItem(key);
            var result = JSON.parse(cacheVal);
            var now = new Date().getTime();
            //缓存不存在
            if (!result) {
                return null;
            }
            //缓存过期
            if (now > result.exp) {
                this.remove(key);
                return "";
            }
            return result.val;
        } catch (e) {
            this.remove(key);
            return null;
        }
    },
    remove: function(key) {
        if (!localStorage) {
            return false;
        }
        localStorage.removeItem(key);
    }
}
