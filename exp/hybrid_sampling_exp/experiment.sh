#!/bin/bash

#
# Copyright (c) 2015, University of California, Berkeley
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
# list of conditions and the following disclaimer.
# 2. Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# The views and conclusions contained in the software and documentation are those
# of the authors and should not be interpreted as representing official policies,
# either expressed or implied, of the FreeBSD Project.
#

# author: Liang Gong

# back up the preivous results
rm result.txt
rm result.bak.txt
rm result.time.bak.txt;
mv result.time.txt result.time.bak.txt;
rm result.warning.bak.txt;
mv result.warning.txt result.warning.bak.txt;

# procedure that collects results and timing on one bechmark
# f: arg1 -> arg2
# arg1: name of benchmark
# arg2: location of benchmark
# arg3: sampling module
runexp() {
    echo "$1"
    echo '[**name**]'"$1" >> result.time.txt
    echo '[**name**]'"$1" >> result.warning.txt

    echo '[****]loc: '`wc -l $2".js"` >> result.time.txt

    echo "instrumenting program:" "$2".js
    # first instrument the code
    # node ../jalangi2/src/js/commands/esnstrument_cli.js --inlineIID ../jalangi2/tests/octane/splay.js
	node ../jalangi2/src/js/commands/esnstrument_cli.js --inlineIID "$2".js

	echo "start running..."
	# run analysis on the benchmark code
	# get jitprof slowdown
	( node ../jalangi2/src/js/commands/direct.js --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/jitprof/utils/Utils.js --analysis src/js/analyses/jitprof/utils/RuntimeDB.js --analysis src/js/analyses/jitprof/TrackHiddenClass.js  --analysis src/js/analyses/jitprof/AccessUndefArrayElem.js --analysis src/js/analyses/jitprof/SwitchArrayType.js --analysis src/js/analyses/jitprof/NonContiguousArray.js --analysis src/js/analyses/jitprof/BinaryOpOnUndef.js --analysis src/js/analyses/jitprof/PolymorphicFunCall.js --analysis src/js/analyses/jitprof/TypedArray.js --analysis src/js/analyses/jitprof/sampler/"$3".js  "$2"_jalangi_.js ) 2>> result.time.txt 1>> /dev/null

	# run the benchmark code without instrumentation and analysis
	node src/js/timeNode.js "$2".js 2>> result.time.txt
	# ( { time node "$2" | tee >(grep -Ei ".*" >> result.txt); } 2>&1 ) | { grep -Ei "^(real|user|sys)" >> result.txt; }

	# get jitprof warnings
	( node ../jalangi2/src/js/commands/direct.js --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/jitprof/utils/Utils.js --analysis src/js/analyses/jitprof/utils/RuntimeDB.js --analysis src/js/analyses/jitprof/TrackHiddenClass.js  --analysis src/js/analyses/jitprof/AccessUndefArrayElem.js --analysis src/js/analyses/jitprof/SwitchArrayType.js --analysis src/js/analyses/jitprof/NonContiguousArray.js --analysis src/js/analyses/jitprof/BinaryOpOnUndef.js --analysis src/js/analyses/jitprof/PolymorphicFunCall.js --analysis src/js/analyses/jitprof/TypedArray.js --analysis src/js/analyses/jitprof/sampler/"$3".js  "$2"_jalangi_.js ) >> result.warning.txt 2>&1
}

: <<'END'
END

jalangi_ver="";

# Google Octane
runexp "Octane-Splay" "../jalangi2/tests/octane""$jalangi_ver""/splay" "$1"
runexp "Octane-Richards" "../jalangi2/tests/octane""$jalangi_ver""/richards" "$1"
runexp "Octane-DeltaBlue" "../jalangi2/tests/octane""$jalangi_ver""/deltablue" "$1"
runexp "Octane-Crypto" "../jalangi2/tests/octane""$jalangi_ver""/crypto" "$1"
runexp "Octane-Box2d" "../jalangi2/tests/octane""$jalangi_ver""/box2d" "$1"
runexp "Octane-Code-Load" "../jalangi2/tests/octane""$jalangi_ver""/code-load" "$1"
runexp "Octane-Gbemu" "../jalangi2/tests/octane""$jalangi_ver""/gbemu" "$1"
runexp "Octane-Earley-Boyer" "../jalangi2/tests/octane""$jalangi_ver""/earley-boyer" "$1"
# runexp "Octane-Mandreel" "../jalangi2/tests/octane""$jalangi_ver""/mandreel" "$1"
runexp "Octane-Navier-Stokes" "../jalangi2/tests/octane""$jalangi_ver""/navier-stokes" "$1"
runexp "Octane-Pdfjs" "../jalangi2/tests/octane""$jalangi_ver""/pdfjs" "$1"
runexp "Octane-Raytrace" "../jalangi2/tests/octane""$jalangi_ver""/raytrace" "$1"
runexp "Octane-Regexp" "../jalangi2/tests/octane""$jalangi_ver""/regexp" "$1"
runexp "Octane-Typescript" "../jalangi2/tests/octane""$jalangi_ver""/typescript" "$1"

# SunSpider
runexp "SunSpider-3d-Cube" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-cube" "$1"
runexp "SunSpider-3d-Morph" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-morph" "$1"
runexp "SunSpider-3d-Raytrace" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-raytrace" "$1"
runexp "SunSpider-Access-Binary-Trees" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-binary-trees" "$1"
runexp "SunSpider-Access-Fannkuch" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-fannkuch" "$1"
runexp "SunSpider-Access-Nbody" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-nbody" "$1"
runexp "SunSpider-Access-Nsieve" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-nsieve" "$1"
runexp "SunSpider-Bitops-3bit-Bits-in-Byte" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-3bit-bits-in-byte" "$1"
runexp "SunSpider-Bitops-Bits-in-Byte" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-bits-in-byte" "$1"
runexp "SunSpider-Bitops-Bitwise-And" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-bitwise-and" "$1"
runexp "SunSpider-Bitops-Nsieve-Bits" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-nsieve-bits" "$1"
runexp "SunSpider-Controlflow-Recursive" "../jalangi2/tests/sunspider1""$jalangi_ver""/controlflow-recursive" "$1"
runexp "SunSpider-Crypto-AES" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-aes" "$1"
runexp "SunSpider-Crypto-MD5" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-md5" "$1"
runexp "SunSpider-Crypto-SHA1" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-sha1" "$1"
runexp "SunSpider-Date-Format-Tofte" "../jalangi2/tests/sunspider1""$jalangi_ver""/date-format-tofte" "$1"
runexp "SunSpider-Date-Format-Xparb" "../jalangi2/tests/sunspider1""$jalangi_ver""/date-format-xparb" "$1"
runexp "SunSpider-Math-Cordic" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-cordic" "$1"
runexp "SunSpider-Math-Partial-Sums" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-partial-sums" "$1"
runexp "SunSpider-Math-Spectral-Norm" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-spectral-norm" "$1"
runexp "SunSpider-Regexp-DNA" "../jalangi2/tests/sunspider1""$jalangi_ver""/regexp-dna" "$1"
runexp "SunSpider-String-Base64" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-base64" "$1"
runexp "SunSpider-String-Fasta" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-fasta" "$1"
runexp "SunSpider-String-Tagcloud" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-tagcloud" "$1"
runexp "SunSpider-String-Unpack-Code" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-unpack-code" "$1"
runexp "SunSpider-String-Validate-Input" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-validate-input" "$1"

echo '[*]exp-done' >> result.time.txt
echo '[*]exp-done' >> result.warning.txt