# Import
{expect, assert} = require('chai')
joe = require('joe')
requireFresh = require('../../')

# =====================================
# Tests

packagePath = __dirname+'/../../package.json'
emptyPath = __dirname+'/../../asdasd.json'

joe.suite 'require fresh', (suite,test) ->

	test 'standard', ->
		result = requireFresh(packagePath)
		assert.ok(result)
		assert.ok(result?.version)

	test 'safe', ->
		requireFresh.safe packagePath, (err, result) ->
			assert.ok(result)
			assert.ok(result?.version)

	test 'standard fail', ->
		try
			result = requireFresh(emptyPath)
		catch err
			assert.ok(err)

	test 'safe fail', ->
		requireFresh.safe emptyPath, (err, result) ->
			assert.ok(err)