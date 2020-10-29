// Import
import { ok } from 'assert'
import { join } from 'path'
import kava from 'kava'
import requireFresh, {
	requireFreshPromise,
	requireFreshCallback,
} from './index.js'

// Paths
const packagePath = join(__dirname, '..', 'package.json')
const emptyPath = join(__dirname, '..', 'asdasd.json')

// Tests
kava.suite('require fresh', function (suite, test) {
	test('standard', function () {
		const result = requireFresh(packagePath)
		ok(result)
		// @ts-ignore
		ok(result && result.version) // ensure this actually the package.json data
	})

	test('promise', function () {
		requireFreshPromise(packagePath).then(function (result) {
			ok(result)
			// @ts-ignore
			ok(result && result.version) // ensure this actually the package.json data
		})
	})

	test('callback', function () {
		requireFreshCallback(packagePath, function (err, result) {
			ok(!err, "error doesn't exist")
			ok(result)
			// @ts-ignore
			ok(result && result.version) // ensure this actually the package.json data
		})
	})

	test('standard fail', function () {
		let error = null
		try {
			requireFresh(emptyPath)
		} catch (err) {
			error = err
		}
		ok(error, 'error exists for failed require')
	})

	test('promise fail', function () {
		requireFreshPromise(emptyPath)
			.then(function () {
				throw new Error('this should not fire')
			})
			.catch(function (err) {
				ok(err)
			})
	})

	test('callback fail', function () {
		requireFreshCallback(emptyPath, function (err, result) {
			ok(err)
			ok(typeof result === 'undefined', 'result is undefined')
		})
	})
})
