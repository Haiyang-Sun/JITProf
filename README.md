JITProf v1.1
=====================
### What is JITProf?

JITProf is a tool that tells you which part of your JavaScript code may be slow on JIT-engine. We call those slow code **JIT-unfriendly code**.

#### What is JIT-unfriendly code?

JIT-unfriendly code is a piece of JavaScript that is hard for the JIT-engine to do profitable optimization.

**Example:** Suppose you want to create an array containing 10k numbers with number i at index i:

```javascript
var array = [];
for(var i=10000-1;i>=0;i++) {
	array[i] = i; // JIT-unfriendly code
}
```

This is very JIT-unfriendly, as the first half of iterations create a non-contiguous array.
In order to save memory, JIT-engine will use a hash-table-like representation to store the array
in memory instead of a contiguous memory space (like in C/C++). As a result, accessing the array is very expensive.

A more efficient and JIT-friendly version is to initialize the array elements from a lower index to a higher index:

```javascript
var array = [];
for(var i=0;i<10000;i++) {
	array[i] = i;
}
```

The JIT-engine will always use contiguous memory space to store the array and array access is pretty fast.
This simple change can give you 10X-20X speedup on Firefox and Chrome.

#### How does JITProf work?

JITProf monitors the execution of a JavaScript program and analyses its runtime behavior to pinpoint the JIT-unfriendly code location.

For the previous example, JITProf will pinpoint to ```array[i] = i;``` and tells you the code is accessing a non-contiguous array
frequently. Note that this is only one of those JIT-unfriendly code patterns deteted by JITProf. 
For more details, please [read this document](docs/TR.md).

#### Overall how much speedup after removing JIT-unfriendly code?

The speedup ranges from 1% ~ 20% on SunSpider and Google Octane benchmark.


### Install JITProf

To run JITProf with Jalangi2 on real-world websites, you need to install
	
 * **jalangi2** See the [Jalangi2 Repository](https://github.com/Samsung/jalangi2)
 (Put Jalangi2 repository and this repository under the same directory.)

 * **mitmproxy** For more details, please read [this document](docs/mitmproxy_install.md).

### Use JITProf to find JIT-unfriendly code

JITProf can be used on both node.js applications and websites.

#### Find JIT-unfriendly code on websites

No go back to the jalangi2analyses directory:


```
./script/jitprof-web.sh [sampler's name]
```

Existing samplers: ```non```, ```random```, ```decay```


Now you can explore the web with any browser you like.
In the browser window, use ```Alt```-```Shift```-```T``` key combination to dump
the JITProf wanrings in the web console.

**Note:** After using JITProf, type the following command to disable web proxy configuration. 
```
./script/jitprof-web.sh
```

#### Find JIT-unfriendly code running on node.js

```
./script/jitprof.sh [js program relative path without .js suffix]
```

Example:

```
./script/jitprof.sh tests/jitprof/JITAwareTest
```

#### Find JIT-unfriendly code (reduce overhead by sampling)

**Warning:** the following script will stash and apply a patch to the jalangi2 repository in the sibling directory of jitprof. Please make sure all changes in the Jalangi2 directory are properly saved.

Run JITProf with random sampler (10% sampling rate):
```
./script/jitprof-sample.sh <sampler name> <js program relative path without .js suffix>
```

Existing samplers: ```non```, ```random```, ```decay```

Example:

```
./script/jitprof-sample.sh random tests/jitprof/JITAwareTest
```


### Collect data of instrumentation overhead (with sampling)

Using hybrid sampling (i.e., sampling instrumentation on function level and sampling the analysis of instructions),
we can reduce the overhead of JITProf by one (sometime two) order(s) of magnitude.

For more details and to replicate the experiment, [please go to this page](exp/hybrid_sampling_exp).

License
-------

JITProf is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0.html).
