# Kubernetes runtime

View the latest Kubernetes versions and platforms tested and supported by specific Actian Digital Experience (DX) 9.5 Kubernetes deployments.

!!! important "Operator-based deployments are discontinued"
    Beginning with Actian DX 9.5 CF200, Actian discontinued [Operator-based deployments](https://help.actian.com/digital-experience/9.5/containerization/deploy_container_platforms.html) and provides support only for [Helm-based deployments](../../../deployment/install/container/helm_deployment/overview.md). There will be no further updates or code fixes provided for the operator-based deployments. All customers must migrate to Helm-based deployments for their DX installations. Actian will work with customers as they transition from operator-based deployments to Helm-based deployments. For more information about the migration process, see [Migrating from Operator-based to Helm-based deployments](../../../deployment/install/container/operator-migration/operator_migration_preparation.md).

For best results, customers should remain up-to-date on the latest Actian DX and Kubernetes releases and be aware that Actian DX provides all fixes on the latest release. Customers might be asked to upgrade to the latest Actian DX release to assist with problem determination.

## Kubernetes platform support policy

Actian DX 9.5 CF200 and later versions are designed to run on any [Certified Kubernetes platform](https://www.cncf.io/certification/software-conformance){target="_blank"}, provided that the following statements are true:

* The Kubernetes platform is hosted on x86-64 hardware.
* The Kubernetes platform is officially supported by [Helm](https://helm.sh/docs/topics/kubernetes_distros/){target="_blank"}.

Actian tests DX against a range of Kubernetes platforms that are regularly reviewed and updated with the intent of staying as up-to-date as possible. Actian does not test with every platform vendor or with every Kubernetes version, but Actian aims to cover a representative sample of popular Kubernetes implementations. See [Table 1](#table-1-tested-kubernetes-platforms-on-full-container-deployment) for the list of Kubernetes platforms that Actian tested with.

### Table 1: Tested Kubernetes platforms on full container deployment

This table lists the Kubernetes platforms that Actian tested and supports. This is provided for information only.

|Kubernetes platforms on full deployments|Hybrid deployments (Kubernetes and On-Premises)|
|--------------|-----------------|
|- Amazon EKS<br/>- Google GKE<br/>- Microsoft Azure AKS<br/>- Red Hat OpenShift|- Amazon EKS / AWS EC2<br/>- Red Hat OpenShift on AWS / AWS EC2|

## Kubernetes version support policy

The table 2 lists the Kubernetes versions that Actian tested and supports in Actian DX CF releases.

* Platform providers might release previews of upcoming Kubernetes versions. However, Actian does not provide support for those versions.
* If you encounter an issue on an unsupported or untested Kubernetes version, you might be asked to install a supported level product.

### Table 2: Tested and supported Kubernetes versions

This table provides information about the Kubernetes versions that are tested and supported by Actian DX CF releases.
Review your chosen Kubernetes platform and ensure that it supports the following Kubernetes versions:

<!-- Note: As per L2/L3, only keep three latest releases and delete older ones -->

|CF Level|Kubernetes versions|
|--------------|-----------------|
|CF232| Kubernetes 1.34<br/>Kubernetes 1.33<br/>Kubernetes 1.32<br/>Kubernetes 1.31<br/>Kubernetes 1.30<br/>Kubernetes 1.29<br/>Kubernetes 1.28<br/>Kubernetes 1.27<br/>Kubernetes 1.26<br/>|
|CF231| Kubernetes 1.34<br/>Kubernetes 1.33<br/>Kubernetes 1.32<br/>Kubernetes 1.31<br/>Kubernetes 1.30<br/>Kubernetes 1.29<br/>Kubernetes 1.28<br/>Kubernetes 1.27<br/>Kubernetes 1.26<br/>|
|CF230| Kubernetes 1.34<br/>Kubernetes 1.33<br/>Kubernetes 1.32<br/>Kubernetes 1.31<br/>Kubernetes 1.30<br/>Kubernetes 1.29<br/>Kubernetes 1.28<br/>Kubernetes 1.27<br/>Kubernetes 1.26<br/>|

!!!important
    To prevent a possible Kubernetes deployment failure in Kubernetes versions 1.28 and 1.29, it may be required to run the command `modprobe br_netfilter` before running `kubeadm init`. This is a potential solution to avoid a networking bridge/iptables issue.

## Prerequisites checker for DX deployment

Actian DX provides a tool called "Prereqs Checker" that runs several checks to confirm whether the prerequisites for various components are met.  

You can get the result of these checks from the container logs of the `prereqs-checker` container in the pod where Prereqs Checker is installed. For more information, see [Configure Prereqs Checker For DX Deployment](../../../deployment/install/container/helm_deployment/preparation/optional_tasks/optional-core-prereqs-checker.md).   

For these checks, one separate sidecar container is deployed with the main application container. This is a lightweight container so the main application performance is not affected.

The primary objective of the Prereqs Checker is to learn whether the specified prerequisites are met and to inform users of the result in the logs. You can also use the checker to discover basic information about the file system of the mounted volumes, which helps track the issues related to the file systems.
