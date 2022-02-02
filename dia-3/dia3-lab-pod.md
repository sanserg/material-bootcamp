# Lab 3: Pod Creation

## Prerequisites

connect to the cluster
```bash
ibmcloud ks cluster config --cluster bootcamp
```

Check the connectivity
```bash
kubectl get pods --all-namespaces
```
Create a new namespace
```bash
kubectl create namespace student<studentId>
```
Set the context to your namespace
```bash
kubectl config set-context --current --namespace=student<studentId>
```
check if the namespace is set 
```bash
kubectl config view --minify | grep namespace:
```
## Supporting Information

- https://cloudnative101.dev/lectures/kube-core-concepts/ (how to create namespaces and pods with kubectl)
- https://cloudnative101.dev/lectures/kube-configuration/ (how to refine the config of your pods, e.g. commands and arguments)

Hint: make sure to select **more** on the Kubernetes YAML examples in above supporting information.

## Challenge to be solved

Create your own Kubernetes namespace and set it into your Kubernetes context.
Write a pod definition named `yoda-service-pod.yml`. Then create a pod in the cluster using this definition to make sure it works.

The specifications of this pod are as follows:

- Use the bitnami/nginx container image.
- The container needs a containerPort of 80.
- Set the command to run `["nginx"]`
- Pass in the `["-g", "daemon off;", "-q"]` args to run nginx in quiet mode.
- Create the pod in the " student< studentId >" namespace.

### Verification


To see the logs on your pod:

```bash
$ kubectl logs nginx
```

When you have completed this lab, use the following commands to validate your solution.

```bash
$ kubectl get pods -n  < studentID >
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          8s

$ kubectl describe pod nginx -n  < studentID >
[...]
Events:
  Type    Reason     Age   From                     Message
  ----    ------     ----  ----                     -------
  Normal  Scheduled  27s   default-scheduler        Successfully assigned dev-yourinitials/nginx to 10.134.237.244
  Normal  Pulling    26s   kubelet, 10.134.237.244  Pulling image "bitnami/nginx"
  Normal  Pulled     20s   kubelet, 10.134.237.244  Successfully pulled image "bitnami/nginx"
  Normal  Created    20s   kubelet, 10.134.237.244  Created container nginx
  Normal  Started    20s   kubelet, 10.134.237.244  Started container nginx
```
