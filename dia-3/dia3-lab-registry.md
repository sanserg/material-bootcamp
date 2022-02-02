# Lab 2: Container Registry

## Prerequisites

This set of instructions requires that Docker is already installed and docker commands can be run from a bash shell. You can get more information at the [Docker website](https://docker.com/get-started).

**Note**: This demo assumes that you are running in a "clean" environment. Clean means that you have not used docker with the images in this demo. This is important for someone who is using docker for the first time, so they can see the activity as images are downloaded.

## Working with docker

Please make sure to login on your IBM Cloud Account CLI before starting this lab and make sure you're logged in the bootcamp resource group

Let's download our sample application

```bash
$ git clone https://github.com/iagomlgodoy/material-bootcamp
```

And cd into our dia3-nodeApp

```bash
$ cd ./bootcamp-material/dia-3/dia3-nodeApp/
```

This is a basic node-JS express server that will be using to upload to our registry

But first, let's see if our container runs.

Let's start by building it (please replace the ```<studentID>``` part with your student id provided by the instructor)

```bash
$ docker build -t <studentID>-basic-express:1 .
```

It may take some time for docker to download and build the image

And then run it

```bash
$ docker run -d -p 600<studentid>:6005 <studentID>-basic-express:1
```


Now let's see if our container ir running:

```bash
$ docker ps
```

You should see a container with an image name as the one you've inserted on the docker run and docker build command


```bash
$ docker ps

CONTAINER ID   IMAGE                            COMMAND                  CREATED         STATUS         PORTS                                       NAMES
9018fcb91f11   student57-basic-express:1   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:6005->6005/tcp, :::6005->6005/tcp   boring_shamir
```

now that we see that our container is working we should be able to send a curl command to it and get a "Server Online" message

```bash
$ curl localhost:600<studentid>
Server Online 
```

Once we validated that our container works as expected, let's login to our IBM Cloud Container registy, you'll should see the output as listed below

**(Please note that you must be logged in on ibmcloud on the ca-tor region for this to work, you can find instructions for login at https://cloud.ibm.com/docs/cli?topic=cli-ibmcloud_cli#ibmcloud_login)**

```bash
$ ibmcloud cr login

Logging in to 'us.icr.io'...
Logged in to 'us.icr.io'.

OK
```

And now we rebuild our image in order to tag it to our repository 

```bash
$ docker build -t us.icr.io/tecban-bootcamp/<studentID>-basic-express:1 .
```

At this point we have tagged the image to our repository but it still hasn't been uploaded to it. We can check that by running the following command:

```bash
$ ibmcloud cr image-list --restrict tecban-bootcamp
```


Now we push our image to the registry:

```bash
$ docker push us.icr.io/tecban-bootcamp/<studentID>-basic-express:1
```

and the output once the process is completed should look like this:

```bash
The push refers to repository [us.icr.io/tecban-bootcamp/student57-basic-express]
b577b65cf6ea: Pushed 
06a73bff2c4e: Pushed 
061c173aa9f0: Pushed 
182406455c22: Pushed 
28e2f0d3695c: Pushed 
b892edc3d92e: Pushed 
f1486e967e48: Pushed 
5750262417ad: Pushed 
9ed3c35b4335: Pushed 
6f7f3f280040: Pushed 
d6e0d602719c: Pushed 
73c3e7ef7bc6: Pushed 
```
And now when we check our repository we should see our image uploaded (please note that there might be other students images there as well)

```bash
$ ibmcloud cr image-list --restrict tecban-bootcamp

Listing images...

Repository                                               Tag   Digest         Namespace              Created          Size     Security status   
us.icr.io/tecban-bootcamp/student57-basic-express   1     71e7c7906bfb   tecban-bootcamp   59 minutes ago   364 MB   Scanning...   

OK
```

For testing, lets stop all of our containers and remove them.

If you want to stop individual containers you can execute ``` docker ps | grep <studentID>``` to see running containers with your id and execute ```docker kill <container_ID_goes_here>``` and ```docker rm <container_ID_goes_here>``` for each container



And now we are able to remove the locally saved images we have created before:


```bash
docker rmi us.icr.io/tecban-bootcamp/<studentID>-basic-express:1
docker rmi <studentID>-basic-express:1
```

and whenever we want to run our container we can just reference the image on the registry and it will download it for us


```bash
docker run -d -p 600<studentid>:6005 us.icr.io/tecban-bootcamp/<studentID>-basic-express:1
```

the output should look something like this:

```bash
Unable to find image 'us.icr.io/tecban-bootcamp/student57-basic-express:1' locally
1: Pulling from tecban-bootcamp/student57-basic-express
Digest: sha256:71e7c7906bfb1417a0981ddf7b0e19821daadc0753e40c049349ff3eca644a0c
Status: Downloaded newer image for us.icr.io/tecban-bootcamp/student57-basic-express:1
7f6970f196264a3e70c7f30ceab55b6d43d38b67c484f1a8f90e98b5f02389e4
```

And done! Now you have your image properly pushed to a container registry! 