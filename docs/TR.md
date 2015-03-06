
### Introduction

Most modern JavaScript engines use just-in-time (JIT) compilation to translate parts of JavaScript code into efficient machine code at runtime. Despite the overall success of JIT compilers, programmers may still write code that uses the dynamic features of JavaScript in a way that prohibits profitable optimizations. Unfortunately, there currently is no technique that helps developers to identify such JIT-unfriendly code. This paper presents JIT-Prof, a profiling framework to dynamically identify code locations that prohibit profitable JIT optimizations. The basic idea is to associate execution counters with potentially JIT-unfriendly code locations and to use these counters to report code locations that match code patterns known to prohibit optimizations. We instantiate the idea for six JIT-unfriendly code patterns that cause performance problems in the Firefox and Chrome browsers, and we apply the approach to popular benchmark programs. Our results show that refactoring these programs to avoid performance problems identified by JIT-Prof leads to performance improvements of up to 26.3% in 12 benchmarks.

### Authors
Liang Gong, Michael Pradel, Koushik Sen

A technical report is available at:

http://www.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-144.html