{
	'targets': [
		{
			'target_name': 'MediaController',
			'sources': [],
			'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
			'cflags!': ['-fno-exceptions'],
			'cflags_cc!': ['-fno-exceptions'],
			"conditions": [
				["OS=='win'", {
					'sources': [ 'lib/win/index.cc', 'lib/win/player.cc', 'lib/utils.cc' ],
					'libraries': [ 'WindowsApp.lib' ],
					'msvs_settings': {
						'VCCLCompilerTool': {
							'ExceptionHandling': 1,
							'AdditionalOptions': ['/std:c++20', '/await', '/Zc:twoPhase-'],
						},
					},
				}],
				# ["OS=='linux'", {
				# 	'sources': [ ],  
				# 	'cflags_cc': ['-fno-exceptions', '-std=c++20'],
				# 	'cflags': ['<!@(pkg-config --cflags dbus-1)'],
				# 	'ldflags': ['<!@(pkg-config  --libs-only-L --libs-only-other dbus-1)'],
        #   'libraries': ['<!@(pkg-config  --libs-only-l --libs-only-other dbus-1)']
				# }]
			]
		}
	]
}