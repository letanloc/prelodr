'use strict'

var fs = require('fs')
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect

describe('Prelodr', function () {
  var Prelodr

  this.timeout(15000)

  jsdom({
    src: fs.readFileSync('src/prelodr.js', 'utf-8')
  })

  before(function () {
    Prelodr = global.window.Prelodr
    document.body.innerHTML = fs.readFileSync('test/test.html', 'utf-8')
  })

  it('class should be initialized successfully.', function () {
    var prelodr = new Prelodr()
    expect(prelodr).to.be.an('object')
  })

  it('show() callback should be called successfully.', function (done) {
    var prelodr = new Prelodr({
      show: function () {
        done()
      }
    })

    prelodr.in('Loading...')
  })

  it('hide() callback should be called successfully.', function (done) {
    var prelodr = new Prelodr({
      hide: function () {
        done()
      }
    })

    prelodr.in('Loading...')

    setTimeout(function () {
      prelodr.out()
    }, 400)
  })

})
