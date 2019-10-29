class Promise2 {
    succeed = null;
    fail = null;
    constructor(fn) {
        if (typeof fn !== "function") {
            throw new Error("我只接收函数")
        }
        fn(() => {
            setTimeout(() => { this.succeed() }, 0)
        }, () => {
            setTimeout(() => { this.fail() }, 0)
        })
    }
    then(succeed, fail) {
        this.succeed = succeed
        this.fail = fail
    }
}

export default Promise2;