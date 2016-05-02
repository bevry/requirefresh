// Require Fresh
// may throw
// return result
function requireFresh (path) {
	// Resolve the path to the one used for the cache
	const resolvedPath = require('path').resolve(path)

	// Attempt require with removals of the cache
	delete require.cache[resolvedPath]  // clear require cache for the config file
	const result = require(resolvedPath)
	delete require.cache[resolvedPath]  // clear require cache for the config file

	// Return result
	return result
}

// Require Fresh Safe
// next(err, result)
function requireFreshSafe (path, next) {
	let result, error
	try {
		result = requireFresh(path)
	}
	catch ( err ) {
		error = err
	}
	next(error, result)
	// ^ error cannot be returned
	// ^ because what if the module intended to RETURN (not throw) an error
	// ^ hence why callback is only option here, as it can differentiate between returned and thrown errors
}

// Export and alias
requireFresh.safe = requireFreshSafe
module.exports = requireFresh
