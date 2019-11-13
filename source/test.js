'use strict'

// Import
const { ok } = require('assert')
const { join } = require('path')
const kava = require('kava')
const requireFresh = require('./')

// Paths
const packagePath = join(__dirname, '..', 'package.json')
const emptyPath = join(__dirname, '..', 'asdasd.json')

// Tests
kava.suite('require fresh', function(suite, test) {
	test('standard', function() {
		const result = requireFresh(packagePath)
		ok(result)
		ok(result && result.version) // ensure this actually the package.json data
	})

	test('safe', function() {
		requireFresh.safe(packagePath, function(err, result) {
			ok(!err, "error doesn't exist")
			ok(result)
			ok(result && result.version)
		})
	})

	test('standard fail', function() {
		let error = null
		try {
			requireFresh(emptyPath)
		} catch (err) {
			error = err
		}
		ok(error, 'error exists for failed require')
	})

	test('safe fail', function() {
		requireFresh.safe(emptyPath, function(err, result) {
			ok(err)
			ok(typeof result === 'undefined', 'result is undefined')
		})
	})
})
