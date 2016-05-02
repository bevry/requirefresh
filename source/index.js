# Require Fresh
# may throw
# return result
requireFresh = module.exports = (path) ->
	# Resolve the path to the one used for the cache
	path = require('path').resolve(path)

	# Attempt require with removals of the cache
	delete require.cache[path]  # clear require cache for the config file
	result = require(path)
	delete require.cache[path]  # clear require cache for the config file

	# Return result
	return result

# Require Fresh Safe
# next(err, result)
module.exports.safe = (path, next) ->
	try
		result = requireFresh(path)
	catch err
		error = err

	next(error, result)
	return null