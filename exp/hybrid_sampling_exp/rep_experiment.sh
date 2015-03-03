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

rm -Rf exp/hybrid_sampling_exp/result/*
mkdir exp/hybrid_sampling_exp/result
# number of iterations for each experimental configuration
rounds=5

# ----------------------------------------------------------------------------
# collecting original jitprof slowdown with decaying sampling rate
# apply jalangi2 change patch for sampling configuration
cd ../jalangi2
git stash  # undo applied patches
git apply ../jalangi2analyses/exp/hybrid_sampling_exp/patch/patch_for_jitprof_analysis_sampling.patch
cd ../jalangi2analyses

# replace analysis.js with the one using sampling call
cp exp/hybrid_sampling_exp/patch/analysis.hybrid.decay.js ../jalangi2/src/js/runtime/analysis.js

for i in `seq 1 $rounds`;
	do
		# generate random array
		node exp/hybrid_sampling_exp/getDecayingSampleArray.js
		cp exp/hybrid_sampling_exp/patch/sample_decay.json ../jalangi2/src/js/runtime/sample_decay.json
		# collect data for all benchmarks (function level using decaying sampling)
		./exp/hybrid_sampling_exp/experiment.sh decay
		node ./exp/hybrid_sampling_exp/stat.js result.txt exp/hybrid_sampling_exp/result/result-jitprof-hybrid-decay-"$i".csv
		# collect warning preservation information
		node exp/hybrid_sampling_exp/warningMatcher.js result.txt > exp/hybrid_sampling_exp/result/result-jitprof-hybrid-decay-"$i".json
    done 

# undo applied patches
cd ../jalangi2
git stash
cd ../jalangi2analyses
