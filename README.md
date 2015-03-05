JITProf (on Jalangi2)
=====================
### Introduction

Most modern JavaScript engines use just-in-time (JIT) compilation to translate parts of JavaScript code into efficient machine code at runtime. Despite the overall success of JIT compilers, programmers may still write code that uses the dynamic features of JavaScript in a way that prohibits profitable optimizations. Unfortunately, there currently is no technique that helps developers to identify such JIT-unfriendly code. This paper presents JIT-Prof, a profiling framework to dynamically identify code locations that prohibit profitable JIT optimizations. The basic idea is to associate execution counters with potentially JIT-unfriendly code locations and to use these counters to report code locations that match code patterns known to prohibit optimizations. We instantiate the idea for six JIT-unfriendly code patterns that cause performance problems in the Firefox and Chrome browsers, and we apply the approach to popular benchmark programs. Our results show that refactoring these programs to avoid performance problems identified by JIT-Prof leads to performance improvements of up to 26.3% in 12 benchmarks.

### Authors
Liang Gong, Michael Pradel, Koushik Sen

A technical report is available at:

http://www.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-144.html


### Install

To run JITProf with Jalangi2 on real-world websites, you need to install
	
 * jalangi2
 * mitmproxy

#### Install jalangi2

**Important Note:** put Jalangi2 repository and this repository under the same directory.

See the Jalangi2 Repository here:
https://github.com/Samsung/jalangi2

##### Install mitmproxy and certificates

For more details, please read [this document](docs/mitmproxy_install.md).

#### Run JITProf on node.js

```
./script/jitprof.sh <js program relative path without .js suffix>
```

Example:

```
./script/jitprof.sh tests/jitprof/JITAwareTest
```

### Run JITProf on node.js with sampling

**Warning:** the following script will stash and apply a patch to the jalangi2 repository in the sibling directory of jitprof. Please make sure all changes in that Jalangi2 directory are properly saved.

Run JITProf with random sampler (10% sampling rate):
```
./script/jitprof-sample.sh <sampler name> <js program relative path without .js suffix>
```

Existing samplers: ```non```, ```random```, ```decay```

Example:

```
./script/jitprof-sample.sh random tests/jitprof/JITAwareTest
```

### Run JITProf in Jalangi2 on Websites

No go back to the jalangi2analyses directory:


```
./script/jitprof-web.sh < sampler's name >
```

Existing samplers: ```non```, ```random```, ```decay```

Example:
```
./script/jitprof-web.sh non
```

Now you can explore the web with any browser you like.
In the browser window, use ```Alt```-```Shift```-```T``` key combination to dump
the JITProf wanrings in the web console.

After using JITProf, type the following command to disable web proxy configuration. 
```
./script/jitprof-web.sh
```

### Run nop-analysis on Jalangi2

Nop-analysis is the empty template. 

```
node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis ../jalangi2/src/js/runtime/analysisCallbackTemplate.js tests/jitprof/JITAwareTest.js
```

### Collect data of instrumentation overhead (with sampling)

Using hybrid sampling (i.e., sampling instrumentation on function level and sampling the analysis of instructions),
we can reduce the overhead of JITProf by one (sometime two) order(s) of magnitude.

For more details and to replicate the experiment, [please go to this page](exp/hybrid_sampling_exp).

### Collect data of instrumentation overhead (deprecated)

```
./exp/experiment.sh
node ./exp/stat.js result.txt result.csv
```

If sampling mechanism is deployed, generate the sampling array first:
```
node exp/getSampleArray.js
```
