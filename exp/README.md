#### Detailed instructions on how to replicate the slowdown table

Make sure that you are using Mac OS (Linux is not tested).

Since automatically generating the slowdown table requires some additional tools and code,
using ```Jalangi2``` repository alone is not enough. Please see the following step by step
instructions on how to replicate the table

##### Step 1: Clone this repository and Jalangi2 repository on your computer

In you current directory, say ```dirRoot```, use the following command (On Mac OS):

```
mkdir jitprof_exp
cd jitprof_exp
git clone https://github.com/Berkeley-Correctness-Group/jalangi2analyses.git
git clone https://github.com/Samsung/jalangi2.git
```

Now you have both ```jalangi2analysis2``` and ```jalangi2``` in your local directory.
Go to ```jalangi2``` directory and install Jalangi2 first, more details on how to install Jalangi2 can be found here: [https://github.com/Samsung/jalangi2]

##### Step 2: Apply patch to Jalangi2 for the second column

The patch will insert some statements into Jalangi2 files to collect the time information.

To apply the patch, in the ```dirRoot``` directory (which contains both ```jalangi2``` and ```jalangi2analysis``` repository) use the following command:

```
cd jalangi2
git apply ../jalang2analyses/exp/patch/patch_for_nop_analysis.patch
cd ../jalangi2analyses
```

##### Step 3: Collect data for the first and second column

Now you are under the ```jalangi2analyses``` directory and ready to do the experiment:

```
./exp/experiment.sh
node ./exp/stat.js result.txt result-nop-1.csv
```

After the execution, there will be a ```result-nop-1.csv``` file which contains the running time and slowdown of nop-analysis on Jalangi2.

The running time of the original time can be obtained by calculating ```runtime/slowdown``` in EXCEL table.

##### More details of the configuration for this experiemnt:

As shown in ```dirRoot/jalang2analyses/exp/patch/patch_for_nop_analysis.patch``` file:
   
   * ```Config.INSTR_END_EXPRESSION``` always returns ```false```
   * ```Config.ENABLE_SAMPLING``` is set to ```false```
   * The original running time and instrumented program running time are collected using JavaScript ```Date.now()``` API.

As shown in ```dirRoot/jalang2analyses/exp/experiment.sh``` file:

   * The command line for instrument (say) ```splay.js``` is:
   ```
   node ../jalangi2/src/js/commands/esnstrument_cli.js --inlineIID ../jalangi2/tests/octane/splay.js
   ```
   * The command line for collecting (say) ```splay.js``` is:
   ```
node ../jalangi2/src/js/commands/direct.js --analysis ../jalangi2/src/js/runtime/analysisCallbackTemplate.js ../jalangi2/tests/octane/splay_jalangi_.js
   ```
   * The command line for collecting original time of ```splay.js``` is:
   ```
   node src/js/timeNode.js ../jalangi2/tests/octane/splay.js
   ```

##### Step 4: Apply patch to Jalangi2 for the third column

To apply the patch, in the ```dirRoot``` directory use the following command:

```
cd jalangi2
git stash
git apply ../jalang2analyses/exp/patch/patch_for_nop_analysis_sampling.patch
cd ../jalangi2analyses
```

##### Step 5: Collect data for the third

Now you are under the ```jalangi2analyses``` directory and ready to do the experiment:

```
./exp/experiment.sh
node ./exp/stat.js result.txt result-nop-2.csv
```

After the execution, there will be a ```result-nop-2.csv``` file which contains the running time and slowdown of nop-analysis on Jalangi2.

The running time of the original time can be obtained by calculating ```runtime/slowdown``` in EXCEL table.

##### More details of the configuration for this experiemnt:

The experimental configuration of this step is almost the same as that of Step 3, except the following: 

As shown in ```dirRoot/jalang2analyses/exp/patch/patch_for_nop_analysis.patch``` file:
   
   * ```Config.ENABLE_SAMPLING``` is set to ```true```
   