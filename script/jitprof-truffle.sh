#!/bin/bash

# author: Haiyang Sun

# run JITProf with sampling
echo "analyzing with JITProf..."
GRAALNODE="/Users/haiyang/Documents/WorkSpace/Graal/graalvm-0.18-dk/bin/node"
NODE="${GRAALNODE} -J-Dgraal.TraceTruffleCompilation=false -J-Dtruffle.new.profiling=true"
analyses=""
while IFS='' read -r line || [[ -n "$line" ]]; do
    if [[ $line = \#* ]]; then
      analyses=$analyses
    else
      analyses=$analyses" --analysis "$line
      echo $line
    fi
done < analyses;
$NODE ../src/js/commands/direct.js \
$analyses \
"$1"
