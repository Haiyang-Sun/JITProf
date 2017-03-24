#!/bin/bash

# author: Haiyang Sun

# instrument code
echo "instrumenting ""$1".js"..."
node ../src/js/commands/esnstrument_cli.js --inlineIID "$1".js
# run JITProf with sampling
echo "analyzing with JITProf..."
if [ -z ${GRAALNODE+x} ]; then
    echo "GRAALNODE is not set, use default node"
    GRAALNODE="node"
fi
NODE="${GRAALNODE} -J-Dgraal.TraceTruffleCompilation=false -J-Dtruffle.new.profiling=false"

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
../octane/harness.js \
"$1"_jalangi_
