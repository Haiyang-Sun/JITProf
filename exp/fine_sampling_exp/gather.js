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

// gather data in csv table generated from rep_experiment.sh
// and regenerate a new table
// here is an example of the processed table format
/*
	Benchmark,LOC,Runtime (s),Slowdown,Inline cache miss,Undefined array element,Swtich array type,Non-contiguous array key,Init fields outside constructor,Binary operation on undefined,Polymorphic function call,arguments leaking,typed array
	Octane-Splay,395,0.036,7.199999999999999,0,0,0,0,0,0,0,0,0,
	Octane-Richards,537,0.11,18.333333333333332,0,0,0,0,0,0,0,0,0,
	Octane-DeltaBlue,880,0.198,13.200000000000001,0,0,0,0,0,0,0,0,0,
	Octane-Crypto,1697,2.648,110.33333333333334,0,0,0,0,0,0,0,0,0,
	Octane-Box2d,9528,3.271,17.398936170212764,0,0,0,0,0,0,0,0,0,
	Octane-Code-Load,1527,2.119,88.29166666666667,0,0,0,0,0,0,0,0,0,
	Octane-Gbemu,11106,10.046,42.56779661016949,0,0,0,0,0,0,0,0,0,
	Octane-Earley-Boyer,4683,1.77,46.578947368421055,0,0,0,0,0,0,0,0,0,
	Octane-Navier-Stokes,407,1.676,69.83333333333333,0,0,0,0,0,0,0,0,0,
	Octane-Pdfjs,33062,6.106,24.134387351778656,0,0,0,0,0,0,0,0,0,
	Octane-Raytrace,904,0.521,19.296296296296298,0,0,0,0,0,0,0,0,0,
	Octane-Regexp,1765,0.512,6.736842105263158,0,0,0,0,0,0,0,0,0,
	Octane-Typescript,25911,34.179,22.710299003322262,0,0,0,0,0,0,0,0,0,
	SunSpider-3d-Cube,339,6.693,1.358984771573604,0,0,0,0,0,0,0,0,0,
	SunSpider-3d-Morph,56,0.337,16.047619047619047,0,0,0,0,0,0,0,0,0,
	SunSpider-3d-Raytrace,443,0.4,14.285714285714286,0,0,0,0,0,0,0,0,0,
	SunSpider-Access-Binary-Trees,52,0.194,12.125,0,0,0,0,0,0,0,0,0,
	SunSpider-Access-Fannkuch,68,0.803,42.26315789473684,0,0,0,0,0,0,0,0,0,
	SunSpider-Access-Nbody,170,0.421,23.38888888888889,0,0,0,0,0,0,0,0,0,
	SunSpider-Access-Nsieve,39,0.292,17.176470588235293,0,0,0,0,0,0,0,0,0,
	SunSpider-Bitops-3bit-Bits-in-Byte,38,0.377,25.133333333333333,0,0,0,0,0,0,0,0,0,
	SunSpider-Bitops-Bits-in-Byte,26,0.516,34.400000000000006,0,0,0,0,0,0,0,0,0,
	SunSpider-Bitops-Bitwise-And,31,0.336,22.400000000000002,0,0,0,0,0,0,0,0,0,
	SunSpider-Bitops-Nsieve-Bits,35,0.549,30.500000000000004,0,0,0,0,0,0,0,0,0,
	SunSpider-Controlflow-Recursive,25,0.242,12.736842105263158,0,0,0,0,0,0,0,0,0,
	SunSpider-Crypto-AES,425,0.327,12.111111111111112,0,0,0,0,0,0,0,0,0,
	SunSpider-Crypto-MD5,288,0.272,15.111111111111112,0,0,0,0,0,0,0,0,0,
	SunSpider-Crypto-SHA1,225,0.262,11.90909090909091,0,0,0,0,0,0,0,0,0,
	SunSpider-Date-Format-Tofte,300,4.158,244.58823529411765,0,0,0,0,0,0,0,0,0,
	SunSpider-Date-Format-Xparb,418,0.338,3.9302325581395356,0,0,0,0,0,0,0,0,0,
	SunSpider-Math-Cordic,101,0.542,27.1,0,0,0,0,0,0,0,0,0,
	SunSpider-Math-Partial-Sums,33,0.236,21.454545454545453,0,0,0,0,0,0,0,0,0,
	SunSpider-Math-Spectral-Norm,51,0.355,22.1875,0,0,0,0,0,0,0,0,0,
	SunSpider-Regexp-DNA,1714,0.034,1.0625,0,0,0,0,0,0,0,0,0,
	SunSpider-String-Base64,136,0.244,12.2,0,0,0,0,0,0,0,0,0,
	SunSpider-String-Fasta,90,0.267,13.35,0,0,0,0,0,0,0,0,0,
	SunSpider-String-Tagcloud,266,1.473,26.30357142857143,0,0,0,0,0,0,0,0,0,
	SunSpider-String-Unpack-Code,67,0.138,5.111111111111112,0,0,0,0,0,0,0,0,0,
	SunSpider-String-Validate-Input,90,0.02,1.5384615384615385,0,0,0,0,0,0,0,0,0,
*/


(function() {
	var fs = require('fs');
	var path = require('path');
	var cwd = process.cwd();
	// experiment configuration
	var headers = ['jitprof w/o sampling runtime', 'jitprof random sampling runtime', 'jitprof decaying sampling runtime'];
	var fileNamePrefixs = ['exp/fine_sampling_exp/result/result-jitprof-', 'exp/fine_sampling_exp/result/result-jitprof-rand-', 'exp/fine_sampling_exp/result/result-jitprof-decay-'];
	var fileNameSuffixs = ['.csv', '.csv', '.csv'];
	var resultFile = 'exp/fine_sampling_exp/result/result-overall.csv'
	// number of files in each category
	var numFiles = 5;
	var numGroups = fileNamePrefixs.length;
	var fileGroup;

	// start processing
	run();

	function DataItem() {
		this.benchmark = [];
		this.LOC = [];
		this.runtime = [];
		this.slowdown = [];
	}

	function run() {
		// initialize file names
		initFileNames();
		var item_groups = [];
		for (var i = 0; i < fileGroup.length; i++) {
			var item_group = new DataItem();
			for (var j = 0; j < fileGroup[i].length; j++) {
				var item = parseFile(fileGroup[i][j]);
				// console.log(item);
				item_group = merge(item_group, item);
			}
			item_group = average(item_group, numFiles);
			item_groups.push(item_group);
		}

		generateTable(item_groups);
	}

	function generateTable(item_groups) {
		// first calculate the average runtime
		var orig_runtime = [];
		for (var i = 0; i < item_groups.length; i++) {
			for (var j = 0; j < item_groups[i].benchmark.length; j++) {
				orig_runtime[j] = (orig_runtime[j] || 0) + item_groups[i].runtime[j] / item_groups[i].slowdown[j];
			}
		}
		for (var j = 0; j < item_groups[0].benchmark.length; j++) {
			orig_runtime[j] /= item_groups.length;
		}


		var headerLine = ['benchmark', 'LOC', 'orig-runtime'];
		headerLine = headerLine.concat(headers).join(',');
		fs.writeFileSync(resultFile, headerLine);
		console.log(headerLine);
		for (var j = 0; j < item_groups[0].benchmark.length; j++) {
			var line = '';
			line += item_groups[0].benchmark[j];
			line += ',' + item_groups[0].LOC[j];
			line += ',' + orig_runtime[j];
			for (var k = 0; k < item_groups.length; k++) {
				line += ',' + item_groups[k].runtime[j];
			}
			fs.appendFileSync(resultFile, '\r\n' + line);
			console.log(line);
		}
	}

	function initFileNames() {
		fileGroup = [];
		for (var i = 0; i < numGroups; i++) {
			var group = [];
			fileGroup.push(group);
			for (var j = 0; j < numFiles; j++) {
				var file = path.resolve(cwd + '/' + fileNamePrefixs[i] + (j + 1) + fileNameSuffixs[i]);
				group.push(file);
			}
		}
	}

	function merge(dataItem1, dataItem2) {
		var ret = new DataItem();
		var len = Math.max(dataItem1.benchmark.length, dataItem2.benchmark.length);
		for (var i = 0; i < len; i++) {
			ret.benchmark[i] = dataItem1.benchmark[i] || dataItem2.benchmark[i];
			ret.LOC[i] = (dataItem1.LOC[i] || 0) + (dataItem2.LOC[i] || 0);
			ret.runtime[i] = (dataItem1.runtime[i] || 0) + (dataItem2.runtime[i] || 0);
			ret.slowdown[i] = (dataItem1.slowdown[i] || 0) + (dataItem2.slowdown[i] || 0);
		}
		return ret;
	}

	function average(dataItem, num) {
		var ret = new DataItem();
		var len = dataItem.benchmark.length;
		for (var i = 0; i < len; i++) {
			ret.benchmark[i] = dataItem.benchmark[i];
			ret.LOC[i] = dataItem.LOC[i] / num;
			ret.runtime[i] = dataItem.runtime[i] / num;
			ret.slowdown[i] = dataItem.slowdown[i] / num;
		}
		return ret;
	}

	function parseFile(file) {
		var content = fs.readFileSync(file, 'utf-8');
		var lines = content.split('\n');
		// remove the header line
		lines.shift();
		var item = new DataItem();
		for (var i = 0; i < lines.length; i++) {
			var cols = lines[i].split(',');
			item.benchmark[i] = cols[0];
			item.LOC[i] = (cols[1] | 0);
			item.runtime[i] = parseFloat(cols[2]);
			item.slowdown[i] = parseFloat(cols[3]);
		}
		return item;
	}
})();