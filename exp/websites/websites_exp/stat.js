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
 $ node stat result.txt result.csv
 get parameters from process.argv
 0: node
 1: stat
 2: result.txt
 3: result.csv
 */

/*
 var titles = ['data_name', 'algorithm',
 'total_time', 'total_time_count',
 'bdd_time', 'bdd_time_count',
 'solver_time', 'solver_time_count',
 'within_theory_assign', 'outside_theory_assign',
 'op_num','multiex_op_num',
 //'op_num_reexecute',
 'solver_call_num', 'sat_num', 'unsat_num',
 'dse_input_num', 'multiex_input_num',
 'solver_cache_hit_num',
 'avg_vs_size', 'max_vs_size', 'min_vs_size',
 'avg_pv_ratio', 'max_pv_ratio', 'min_pv_ratio',
 'speedup'];

 var titles_full = ['dataset', 'algorithm',
 'Time spent in total (ms)', 'Time spent in total (count)',
 'Time spent in bdd (ms)', 'Time spent in bdd (count)',
 'Time spent in solver (ms)', 'Time spent in solver (count)',
 'Number of within theory assignments', 'Number of outside theory assignments',
 'Number of operations', 'Number of multiex operations',
 'Number of solver calls', 'Number of sat', 'Number of unsat',
 'Number of DSE inputs', 'Number of MULTIEX inputs',
 'Number of solver cache hit',
 'average value summary size', 'maximum value summary size', 'minimum value summary size',
 'average paths to value ratio', 'maximum paths to value ratio', 'minimum paths to value ratio',
 'DSE/Multiex total time speedup'];
 */

/*
 var titles_full = ['Name', 'Algorithm', 'Total Time (ms)', 'BDD Time (ms)',
 'Solver Time (ms)', '\\# within Theory Assign', '\\# outside Theory Assign',
 '\\# Operations', '\\# \\tool{} Operations', '\\# Solver Calls',
 '\\# \\tool{} Inputs',
 'Avg Value Summary Size', 'Max Value Summary Size', 'Min Value Summary Size',
 'Avg Paths to Value Ratio', 'Max Paths to Value Ratio', 'Min Paths to Value Ratio', 'Total Time Speedup'];
 */


var titles = ['data_name', 
    'hc_num',
    'undef_array_access_num',
    'switch_array_type_num',
    'noncont_array_num',
    'nonconstructor_num',
    'binary_num',
    'polyfun_num',
    'argleak_num',
    'typedarray_num'
];

var titles_full = ['Benchmark', 
    'Inline cache miss',
    'Undefined array element',
    'Swtich array type',
    'Non-contiguous array key',
    'Init fields outside constructor',
    'Binary operation on undefined',
    'Polymorphic function call',
    'arguments leaking',
    'typed array'
];

function createRow() {
    return {
        data_name: 0,
        hc_num: 0,
        undef_array_access_num: 0,
        switch_array_type_num: 0,
        noncont_array_num: 0,
        nonconstructor_num: 0,
        binary_num: 0,
        polyfun_num: 0,
        argleak_num: 0,
        typedarray_num: 0
    };
}


var table = null;

function createTable() {
    table = [];
    table.push(titles_full.join(','));
}

function dumpTableToString() {
    return table.join('\r\n');
}


function formatCell(value) {
    var val = parseFloat(value);
    if (isNaN(val)) {
        /*if(value === null) {
         return '$\\varnothing$';
         }*/
        return value;
    }
    return val;
}

function appendRow() {

    var row_str = '';
    for (var i = 0; i < titles.length; i++) {
        var value = formatCell(currentRow[titles[i]]);
        row_str += value + ',';
    }
    table.push(row_str);
}

var fs = require('fs');
var cwd = process.cwd();
var path = require('path');
var baseDir = path.resolve(cwd + '/' + 'exp/websites/websites_exp/warnings');
var subDirs = fs.readdirSync(baseDir);
var currentRow;
createTable();
for (var i = 0; i < subDirs.length; i++) {
    if(!fs.lstatSync(baseDir + '/' + subDirs[i]).isDirectory())
        continue;
    currentRow = createRow();
    currentRow.data_name = subDirs[i];
    var file = path.resolve(baseDir + '/' + subDirs[i] + '/warning.txt');
    var content = fs.readFileSync(file);
    process_content(content);
    appendRow(currentRow);
}

console.log(dumpTableToString());


function process_content(content) {
    var res_array;

    // [****]HiddenClass: 5
    res_array = /\[\*\*\*\*\]HiddenClass: (\d+)/.exec(content);
    if (res_array) {
        currentRow.hc_num = res_array[1];
    }

    // [****]AccessUndefArrayElem: 0
    res_array = /\[\*\*\*\*\]AccessUndefArrayElem: (\d+)/.exec(content);
    if (res_array) {
        currentRow.undef_array_access_num = res_array[1];
    }

    // [****]SwitchArrayType: 0
    res_array = /\[\*\*\*\*\]SwitchArrayType: (\d+)/.exec(content);
    if (res_array) {
        currentRow.switch_array_type_num = res_array[1];
    }

    // [****]NonContArray: 0
    res_array = /\[\*\*\*\*\]NonContArray: (\d+)/.exec(content);
    if (res_array) {
        currentRow.noncont_array_num = res_array[1];
    }

    // [****]Nonconstructor: 0
    res_array = /\[\*\*\*\*\]Nonconstructor: (\d+)/.exec(content);
    if (res_array) {
        currentRow.nonconstructor_num = res_array[1];
    }

    // [****]BinaryOpUndef: 0
    res_array = /\[\*\*\*\*\]BinaryOpUndef: (\d+)/.exec(content);
    if (res_array) {
        currentRow.binary_num = res_array[1];
    }

    // [****]PolyFun: 0
    res_array = /\[\*\*\*\*\]PolyFun: (\d+)/.exec(content);
    if (res_array) {
        currentRow.polyfun_num = res_array[1];
    }

    // [****]ArgLeak: 0
    res_array = /\[\*\*\*\*\]ArgLeak: (\d+)/.exec(content);
    if (res_array) {
        currentRow.argleak_num = res_array[1];
    }

    // [****]typedArray: 0
    res_array = /\[\*\*\*\*\]typedArray: (\d+)/.exec(content);
    if (res_array) {
        currentRow.typedarray_num = res_array[1];
    }
}