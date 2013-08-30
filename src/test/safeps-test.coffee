# Import
{expect, assert} = require('chai')
joe = require('joe')
{requireFresh} = require('../../')

# =====================================
# Tests

joe.describe 'requirefresh', (describe,it) ->

	it 'should fetch something', ->
		result = requireFresh(__dirname+'/../../package.json')
		assert.ok(result)
		assert.ok(result?.version)
