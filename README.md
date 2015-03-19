# sipgate.io-barcamp.ruhr

## requirements

### remote access

You need a way to expose your local machine to the public internet. You can also do this using port forwarding or an ssh reverse proxy. proxylocal is pretty much the easiest way though.

    sudo gem install proxylocal

### router

To be able to respond differently to another URL you will need a router. A very simpe solution for meteor is the [cfs:http-methods package](https://github.com/CollectionFS/Meteor-http-methods).
