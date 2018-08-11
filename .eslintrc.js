module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"parser":"babel-eslint",
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": [
			"error",
			"always"
		],
		"no-trailing-spaces": [
			"error"
		]
	}
};
