
This document only walks through the installation of mitmproxy on Mac OS for Dynamic analysis on JITProf and DLint. If you are using other operating system, please go to the [official document](http://docs.mitmproxy.org/en/latest/).

Preparation
-----------

In terminal, first make sure that you have the latest version of ```pip``` installed ([install pip](https://pip.pypa.io/en/stable/installing/)).

If you already had pip, make sure that you are using the latest version by typing the following command in the console:
```
pip install -U pip
```

Next, you need to install ```pyOpenSSL``` by typing the following command in the terminal:
```
pip install pyOpenSSL
```

Install
-------------

Note that current the newer version of mitmproxy may have some problem with HTTPS protocol, so make sure that you install mitmproxy (v0.11.3) by typing the following command in the terminal:
```
pip install mitmproxy==0.11.3
```

#### Install mitmproxy certificate (important step!)
**mitm**proxy stands for **m**an-**i**n-**t**he-**m**iddle proxy. HTTPS and SSL are designed to prevent man-in-the-middle-attack. To make mitmproxy capable of intercepting and changing the content in HTTPS, mitmproxy contains a full implementation of Certificate Authority to issue certificate for changed content (In Jalangi, it is the instrumented code). Therefore, we need to manually add mitmproxy's CA system as a legal certificate issuer on our computer.

To make sure that mitmproxy works with HTTPS requests, following the instructions in [this document](https://github.com/ksen007/jalangi2analyses/blob/master/doc/mitmproxy-install.pdf).
