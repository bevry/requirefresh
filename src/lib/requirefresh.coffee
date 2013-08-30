# =====================================
# Define Module

app =

	# Require Fresh
	# Require a file without adding it into the require cache
	# next(err, result)
	requireFresh: (path, next) ->
		# Prepare
		result = null

		# Require the path while avoiding syntax errors
		d = require('domain').create()
		d.on 'error', (err) ->
			result = err
			next?(err)
		d.run ->  # runs sync
			try
				path = require('path').resolve(path)  # get the path that is actually in the cache
				delete require.cache[path]  # clear require cache for the config file
				result = require(path)
				delete require.cache[path]  # clear require cache for the config file
			catch err
				result = err
				next?(err)
			finally
				next?(null, result)

		# Chain
		return result

# =====================================
# Export

module.exports = app