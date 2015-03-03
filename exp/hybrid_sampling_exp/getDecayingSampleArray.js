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
	This is a decaying random array generator
*/

(function () {
	var fs = require('fs');
	// 10% sampling rate
	var random_sampling_rate = 1;
	var sample_array_len = 10000000;
	var sample_count_array = [];
	var count = 1;
	var sample_num = 0;
	var k = 20; // no sampling for the first 20 instances
	for (var i=0;i<sample_array_len;i++) {
		if (sample_count_array.length < k-1) {
			sample_count_array.push(1);
		} else if(Math.random() < random_sampling_rate) {
			sample_count_array.push(count);
			count = 1;
			sample_num++;
			random_sampling_rate = 1/(sample_num + 1);
		} else {
			count++;
		}
	}
	//console.log(sample_count_array);
	console.log('Total Number of Counts: ' + sample_count_array.length);
	var fileLocation = 'exp/hybrid_sampling_exp/patch/sample_decay.json';
	fs.writeFileSync(fileLocation, JSON.stringify(sample_count_array));
	console.log('Sample array json file has been saved to: ' + fileLocation);

	fileLocation = 'src/js/analyses/jitprof/sampler/data/sample_decay.json';
	fs.writeFileSync(fileLocation, JSON.stringify(sample_count_array));
	console.log('Sample array json file has been saved to: ' + fileLocation);
})();