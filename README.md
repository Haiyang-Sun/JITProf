This repository currently has been tested on Mac OS.

### Install

To run JITProf with Jalangi2 on real-world websites, you need to install
	
 * jalangi2
 * mitmproxy

### Install jalangi2
See the Jalangi2 Repository here:
https://github.com/Samsung/jalangi2

### Install mitmproxy
```
sudo easy_install pip
pip install mitmproxy
```

Next update pyOpenSSL to 0.14:

Download pyOpenSSL-0.14 package from here:
https://pypi.python.org/pypi/pyOpenSSL

Decompress the content of the file to the directory where the current version of pyOpenSSL is located:
(see the following example directory):
```
/System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python
```

The location will be nofified by running the ```mitmdump``` command:
```
$ mitmdump -q --anticache -s "../scripts/proxy.py ../src/js/sample_analyses/ChainedAnalyses.js ../src/js/runtime/analysisCallbackTemplate.js"
> You are using an outdated version of pyOpenSSL: mitmproxy requires pyOpenSSL 0.14 or greater.
> Your pyOpenSSL 0.13 installation is located at /System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python/OpenSSL
```

in the pyOpenSSL-0.14 directory, run the following command to install the new version of pyOpenSSL:
```
sudo python setup.py install --user
```

### Install mitmproxy certificate
Details can be found at this location:
http://mitmproxy.org/doc/ssl.html

More details:

In the jalangi2 directory, input the following commands to generate ```cert.pen``` file:
```
$ openssl genrsa -out cert.key 8192
$ openssl req -new -x509 -key cert.key -out cert.crt
    (Specify the mitm domain as Common Name, e.g. *.google.com)
$ cat cert.key cert.crt > cert.pem
$ mitmproxy --cert=cert.pem
```
For the last command, after running it, the console will be occupied.
Open the browser your want to add certificate, surf a few web pages
and back to the console and enter 'q' and 'yes'.

Now you are good to go:
```
../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py ../src/js/sample_analyses/ChainedAnalyses.js ../src/js/runtime/analysisCallbackTemplate.js"
```

### Run JITProf on node.js

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
./script/jitprof-sample.sh <js program relative path without .js suffix>
```

Example:

```
./script/jitprof-sample.sh tests/jitprof/JITAwareTest
```

### Run JITProf in Jalangi2 on Websites

No go back to the jalangi2analyses directory:

under directory ```exp/tmp```:
```
../../../jalangi2/scripts/mitmproxywrapper.py --cert=`pwd`/../../../jalangi2/cert.pem -t -q --anticache -s "../../../jalangi2/scripts/proxy.py ../../../jalangi2/src/js/sample_analyses/ChainedAnalyses.js ../../src/js/analyses/jitprof/utils/Utils.js ../../src/js/analyses/jitprof/utils/RuntimeDB.js ../../src/js/analyses/jitprof/TrackHiddenClass.js  ../../src/js/analyses/jitprof/AccessUndefArrayElem.js ../../src/js/analyses/jitprof/SwitchArrayType.js ../../src/js/analyses/jitprof/NonContiguousArray.js ../../src/js/analyses/jitprof/BinaryOpOnUndef.js ../../src/js/analyses/jitprof/PolymorphicFunCall.js ../../src/js/analyses/jitprof/TypedArray.js"
```

After chaning the analysis configuration, remember to clear cashed files under ```exp/tmp```.


### Collect data of instrumentation overhead

```
./exp/experiment.sh
node ./exp/stat.js result.txt result.csv
```

If sampling mechanism is deployed, generate the sampling array first:
```
node exp/getSampleArray.js
```

### Run nop-analysis on Jalangi2

Nop-analysis is the empty template. 

```
node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis ../jalangi2/src/js/runtime/analysisCallbackTemplate.js tests/jitprof/JITAwareTest.js
```
