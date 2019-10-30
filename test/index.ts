import * as chai from "chai";
import * as sinon from "sinon"
import * as sinonChai from "sinon-chai"
chai.use(sinonChai)
import Promise from "../src/promise"
const assert = chai.assert;

describe('Promise', () => {
    it('是一个类', () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })
    it('new Promise() 如果接收的不是一个函数就报错', () => {
        assert.throw(() => {
            //@ts-ignore
            new Promise();
        })
        assert.throw(() => {
            //@ts-ignore
            new Promise(1);
        })
        assert.throw(() => {
            //@ts-ignore
            new Promise("222");
        })
    })
    it('new Promise(fn)会生成一个对象，对象有 then 方法', () => {
        const promise = new Promise(() => { })
        assert.isFunction(promise.then)
    })
    it('new Promise(fn) 中的 fn 立即执行', () => {
        let fn = sinon.fake()
        new Promise(fn)
        //@ts-ignore
        assert(fn.called)
    })
    it('new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数', (done) => {
        new Promise((resolve, reject) => {
            assert.isFunction(resolve)
            assert.isFunction(reject)
            done()
        })
    })
    it('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', done => {
        const success = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            assert.isFalse(success.called)
            resolve()
            setTimeout(() => {
                assert.isTrue(success.called)
                done()
            })
        })
        //@ts-ignore
        promise.then(success)
    })
    it('promise.then(null,fail) 中的 fail 会在 reject 被调用的时候执行', done => {
        const fail = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            assert.isFalse(fail.called)
            reject()
            setTimeout(() => {
                assert.isTrue(fail.called)
                done()
            })
        })
        //@ts-ignore
        promise.then(null, fail)
    })
    it('2.2.1', () => {
        const promise = new Promise((resolve) => {
            resolve()
        })
        promise.then(false, null)
        assert(1 === 1)
    })
    it('2.2.2', (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve) => {
            assert.isFalse(succeed.called)
            resolve(233) // 233 就是 promise 的值
            setTimeout(() => {
                assert(promise.state === "fulfilled")
                assert.isTrue(succeed.called)
                assert(succeed.calledWith(233))
                done()
            }, 0)

        })
        promise.then(succeed)
    })
})

