/*
 * Copyright (c) 2015, University of California, Berkeley
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies,
 * either expressed or implied, of the FreeBSD Project.
 */

// Author: Liang Gong

/*
 * This is a module to calculate running time of a specified script.
 * usage:
 * 		node timeNode program_path [program parameters]
 */

(function() {
	if (process.argv.length < 3) {
		console.log('usage:\n\tnode timeNode program_path [program parameters]\n');
		process.exit(0);
	}

	var path = require('path');
	// remove first two arguments: node timeNode
	var args = process.argv.slice(2);
	// get script path and remove script path from parameter array
	var script = args.shift();
	// if relative path
	if (path.resolve(script) !== path.normalize(script)) {
		script = path.resolve(process.cwd() + '/' + script);
	}

	try {
		var startTime;
		// process.argv[0]: node
		var newArgs = [process.argv[0], script];
		// add program's command line parameters
		newArgs = newArgs.concat(args);
		process.argv = newArgs;
		process.on('exit', function() {
			var endTime = Date.now(); // end timer
			// print timer in Linux command time format
			var timeDiff = (endTime - startTime) / 1000;
			var seconds = timeDiff % 60;
			var minutes = (timeDiff - seconds) / 60;
			var resultStr = minutes + 'm' + seconds + 's';
			console.error();
			console.error('real\t' + resultStr);
			console.error('user\t' + resultStr);
			console.error('sys\t' + resultStr);
		});
		var mod = require('module').Module;
		startTime = Date.now(); // start timer
		mod.runMain(script, null, true);
	} catch (e) {
		console.error(e);
	}
})();