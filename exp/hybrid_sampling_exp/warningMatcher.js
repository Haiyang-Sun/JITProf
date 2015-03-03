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

// scan the output file (result.txt) of JITProf and 
// check if those warnings that reports profitable 
// jit-unfriendly code patterns still exist

(function() {
	var jitWarningSignatures = {
		"Octane-Splay": "value:n|left:n|right:n|", // value:n|left:n|right:n|
		"Octane-DeltaBlue": "v1:n|v2:n|direction:n", // v1:n|v2:n|direction:n
		"Octane-Crypto": "octane/crypto.js:54:16:54:27",
		"Octane-Box2D": "_incidentVertex:n|_flip:n",
		"Octane-RayTrace": "accessed property \"initialize\" of object",
		"SS-Crypto-SHA1": "crypto-sha1.js:iid3539",
		"SS-3d-Cube": "sunspider1/3d-cube.js:193:23:193:60",
		"SS-String-Tagcloud": "accessed property \"popularity\" of object",
		"SS-Crypto-MD5": "sunspider1/crypto-md5.js:iid9899",
		"SS-Format-Tofte": "sunspider1/date-format-tofte.js:274:12:274:18",
		"SS-Format-Xparb": "sunspider1/date-format-xparb.js:45",
		"SS-3d-Raytrace": "sunspider1/3d-raytrace.js:300",
		"SS-3d-Morph": "sunspider1/3d-morph.js:43",
		"SS-Access-Fannkuch": "sunspider1/access-fannkuch.js:7"
	};

	var flags = {};

	var fs = require('fs'),
		readline = require('readline');

	// read content from the file
	var rd = readline.createInterface({
		input: fs.createReadStream(process.argv[2]),
		output: process.stdout,
		terminal: false
	});

	// process the content line by line
	rd.on('line', function(line) {
		//console.log(line);
		process_line(line);
	});

	rd.on('close', function () {
		createTable();
	});

	function process_line(line) {
		// console.log(line);
		for (var prop in jitWarningSignatures) {
			if (!jitWarningSignatures.hasOwnProperty(prop)) continue;
			if (line.indexOf(jitWarningSignatures[prop]) >= 0) {
				flags[prop] = true;
				//console.log(line);
			}
		}
	}

	function createTable() {
		console.log(JSON.stringify(flags, 0, 2));
	}
})();