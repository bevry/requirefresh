import { resolve } from 'path'

/**
 * Require Fresh Callback in typical errback style.
 * @param error if the `require` call threw, this is its error
 * @param result if the `require` call performed succesfully, this is its result
 */
export type Errback = (error: Error | undefined, result: any) => any

/**
 * Require the path without any caching.
 * @param path the path to require
 * @returns the result of the `require` call
 * @throws note that the `require` call may throw if something went wrong requiring the path
 */
export function requireFresh(path: string) {
	// Resolve the path to the one used for the cache
	const resolvedPath = resolve(path)

	// Attempt require with removals of the cache
	delete require.cache[resolvedPath] // clear require cache for the config file
	const result = require(resolvedPath)
	delete require.cache[resolvedPath] // clear require cache for the config file

	// Return result
	return result
}

// alias
export default requireFresh

/**
 * Require the path without any caching, but catch errors into the callback.
 * Error cannot be returned because what if the module intended to RETURN (not throw) an error, hence why callback is used, as it can differentiate between returned and thrown errors.
 * @param path the path to require
 * @param next the callback
 * @returns {void}
 */
export function requireFreshCallback(path: string, next: Errback) {
	let result, error
	try {
		result = requireFresh(path)
	} catch (err: any) {
		error = err
	}
	next(error, result)
}
// b/c alias
export const requireFreshSafe = requireFreshCallback

/**
 * Require the path without any caching, but catch errors into the callback.
 * Error cannot be returned because what if the module intended to RETURN (not throw) an error, hence why promise is used, as it can differentiate between returned and thrown errors.
 * @param path the path to require
 * @returns {void}
 */
export function requireFreshPromise(path: string) {
	return new Promise(function (resolve, reject) {
		let result
		try {
			result = requireFresh(path)
		} catch (err) {
			return reject(err)
		}
		resolve(result)
	})
}
