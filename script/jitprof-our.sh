#!/bin/bash

# author: Haiyang Sun

# run JITProf with sampling
echo "analyzing with JITProf..."
if [ -z ${GRAALNODE+x} ]; then
    echo "GRAALNODE is not set, use default node"
    GRAALNODE="node"
fi
NODE="${GRAALNODE} -J-Dtruffle.customizedJITProf=true -J-Dgraal.TraceTruffleCompilation=false -J-Dtruffle.new.profiling=true"
$NODE "$1"
