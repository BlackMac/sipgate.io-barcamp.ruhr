# sipgate.io-barcamp.ruhr

this is a very simple example of how to use [sipgate.io](http://sipgate.io)
with [meteor](https://www.meteor.com/)

this code is meant to be used in a workshop, it is not production ready and
should never be used in a production environment.

## requirements

### remote access

You need a way to expose your local machine to the public internet.
You can also do this using port forwarding or an ssh reverse proxy.
proxylocal is pretty much the easiest way though.

    sudo gem install proxylocal

to expose your local meteor instance use

    proxylocal 3000

copy the URL given by proxylocal into both (incoming and outgoing) sipgate.io
URL fields and add "/io"

### router

To be able to respond differently to another URL you will need a router.
A very simple solution for meteor is the [cfs:http-methods package](https://github.com/CollectionFS/Meteor-http-methods).

## testing

to test your code locally without making any actual calls you can just use curl

    curl -X POST --data "from=492111234567&to=4915791234567&direction=in" http://localhost:3000/io
