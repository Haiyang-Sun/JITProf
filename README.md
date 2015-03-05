This repository currently has been tested on Mac OS.

#### Install

To run JITProf with Jalangi2 on real-world websites, you need to install
	
 * jalangi2
 * mitmproxy

#### Install jalangi2
See the Jalangi2 Repository here:
https://github.com/Samsung/jalangi2

#### Install mitmproxy and certificates

For more details, please read [this document](docs/mitmproxy_install.md).

#### Run JITProf on node.js

```
./script/jitprof.sh <js program relative path without .js suffix>
```

Example:

```
./script/jitprof.sh tests/jitprof/JITAwareTest
```

#### Run JITProf on node.js with sampling

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

#### Run JITProf in Jalangi2 on Websites

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

#### Collect data of instrumentation overhead

```
./exp/experiment.sh
node ./exp/stat.js result.txt result.csv
```

If sampling mechanism is deployed, generate the sampling array first:
```
node exp/getSampleArray.js
```

#### Run nop-analysis on Jalangi2

Nop-analysis is the empty template. 

```
node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis ../jalangi2/src/js/runtime/analysisCallbackTemplate.js tests/jitprof/JITAwareTest.js
```
