
##### Run the experiment

In the github root directory of this project, use the following command:

```
./exp/hybrid_sampling_exp/rep_experiment.sh
```

Result will be saved to: ```exp/hybrid_sampling_exp/result``` directory, in which:

 * ```result-jitprof-hybrid-decay-i.csv``` is the i-th iteration slowdown information
 * ```result-jitprof-hybrid-decay-i.json``` contains all the preserved important JIT-unfriendly
warnings in this round of experiment


##### Experiment Configuration

At both instruction and functional level, decaying sampling is deployed.

For first ```k``` (currently 20) rounds of sampling for each ```iid```, there is no sampling.

Sampling rate is calculated as: ```c/(c + n)``` where ```c``` is a constant and ```n``` is
the number of samples obtained so far for current ```iid```.