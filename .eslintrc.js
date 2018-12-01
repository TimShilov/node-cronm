module.exports = {
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true,
	},
	"extends": "airbnb-base",
	"parserOptions": {
		"ecmaVersion": 2016
	},
	"rules": {
		"brace-style": ["error", "1tbs", { "allowSingleLine": false }],
		"comma-dangle": ["error", "always-multiline"],
		"curly": ["error", "all"],
		"indent": ["error",	4],
		'max-len': ["error", { "code": 80, "ignoreComments": true }],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"key-spacing": ["error", { "mode": "minimum" }],
		"keyword-spacing": ["error", {
			"overrides": {
				"if": { "after": false },
				"for": { "after": false },
				"while": { "after": false },
				"switch": { "after": false },
				"function": { "after": false },
			}
		}],
	}
};