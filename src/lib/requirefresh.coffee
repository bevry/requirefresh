# =====================================
# Define Module

app =

	# Require Fresh Safe
	# next(err, result)
	# return result or err
	requireFreshSafe: (path, next) ->
		# Prepare
		result = null

		# Require the path while avoiding syntax errors
		d = require('domain').create()
		d.on 'error', (err) ->
			result = err
			return next?(err)
		d.run -> # sync
			# Attempt
			try
				result = app.requireFresh(path)

			# Failed
			catch err
				result = err
				return next?(err)

			# Success
			return next?(null, result)

		# Return nothing as we can't guarantee sync execution
		return result

	# Require Fresh
	# may throw
	# return result
	requireFresh: (path) ->
		# Resolve the path to the one used for the cache
		path = require('path').resolve(path)

		# Attempt require with removals of the cache
		delete require.cache[path]  # clear require cache for the config file
		result = require(path)
		delete require.cache[path]  # clear require cache for the config file

		# Return result
		return result

# =====================================
# Export

module.exports = app