# Downloading and installing Actian DX from the software licensing portal

Actian Digital Experience (DX) software is now available through the [My ActianSoftware (MHS)](https://support.actian-software.com/csm?id=kb_article&sysparm_article=KB0109011){target="_blank"} portal.

!!!note
    The MHS portal will replace the ActianSoftware License and Download portal as of June 30, 2025. For more information, refer to [Announcing ActianSoftware Download site and Licensing mechanism changes](https://support.actian-software.com/csm?id=kb_article&sysparm_article=KB0112538){target="_blank"}.

To change your entitlement server from FlexNet to MHS portal, see the instructions in [Entitlement checking in the My ActianSoftware delivery portal](./configure_entitlement_checks/mhs_license_and_delivery.md). If there is any overlap between the data from FlexNet and MHS portal, you can retrieve the session usage numbers from both platforms separately. You can then add the numbers from both platforms to obtain the total number of sessions for a specific period.

New customers, or those with new deployments, must register at the MHS portal and download their entitled Actian DX packages there to avoid any need to convert later.

## Getting the software

You can access product software from the [MHS portal](https://my.actian.com/){target="blank"}. For more guidance, refer to the [What is My ActianSoftware](https://support.actian-software.com/csm?id=kb_article&sysparm_article=KB0109011){target="_blank"} knowledge article.

Actian DX V9.5 for deployment to Kubernetes environments can be accessed via Helm charts in the [Actian Harbor repository](https://hclcr.io/account/sign-in?redirect_url=/harbor/projects){target="_blank"}. Customers with credentials to access entitled software in the [MHS portal](https://my.actian.com/){target="blank"} can apply those credentials to optionally access the Docker components of DX v9.5 releases. For more information, see [Access and Deploy DX 9.5 Docker components from Actian Harbor](../harbor_container_registry.md) for more information.

Actian DX software is available through several product offerings and associated software licenses. Depending on the product offering that you purchased, your product might include some or all of the following Actian DX and related programs:

- Actian Digital Experience Cloud Native 9.5
- Digital Experience Manager
- Actian Portal
- Actian Portal Express
- Actian Web Content Manager
- Actian Portal Enable
- Actian Portal Extend
- Actian Customer Experience Suite
- Actian Employee Experience Suite
- IBM WebSphere Application Server Network Deployment
- IBM DB2 Universal Database Workgroup Server Edition
- Actian Connections
- Actian Leap

For more Actian DX product offering and license details, see the [Actian Software Product License site](https://www.actian-software.com/resources/license-agreements){target="_blank"}.

## Installation paths

Depending on your current scenario, you will start from different paths:

- Fresh full installation (for new customers or for a new system)
- Actian DX9.5 deployment to supported platforms, including Docker or OpenShift/Kubernetes with Docker
- Updating an existing Actian DX 8.5 or 9.0 system

You can also test the new Actian DX API Docker image and run it. Visit the [Experience API](../../../extend_dx/apis/hcl_experience_api/index.md) documentation to learn more.

## Fresh full installation

For a fresh full installation, follow the installation path by using the components that follow, which you can find in the [MHS portal](https://my.actian.com/){target="blank"} with Actian DX software packages:

- IBM® Installation Manager.
- IBM WebSphere® Application Server 9.0.5.
- Actian Portal 8.5
- Latest available Actian Digital Experience CF, at least CF205
- Actian Digital Experience 9.5
- Corresponding edition files according to your Actian DX entitlements (Actian Portal Enable, Actian Portal Extend, Actian Portal Server, and Actian Portal Express)

After you install [IBM Installation Manager](https://www.ibm.com/support/knowledgecenter/SSDV2W/im_family_welcome.html){target="_blank"}, you must configure the repositories for IBM WebSphere Application Server 9.0.5, Actian Portal 8.5, Actian DX CF205 or later, Actian DX 9.5, and the corresponding edition files.

## Update an existing Actian DX 8.5 or 9.0 system

The path from an existing Actian DX 8.5 or 9.0 system to Actian DX 9.5 is to download the latest available Actian DX CF and the 9.5 files. Then, install the cumulative fix by the usual CF process.

Afterward, users start IBM Installation Manager, configure the 9.5 repository, and then add version 9.5. Users who are using Actian Portal Enable, Actian Portal Extend, or Actian Web Content Manager must add both the Actian Portal 9.5 Server and the applicable edition via IBM Installation Manager.

-   Documentation resource: [Apply Combined Cumulative Fix](../../../deployment/install/traditional/cf_install/index.md)

## Deploy Actian DX to Kubernetes platforms

Follow this installation path to deploy DX from an existing Actian DX 8.5 or 9.0 system:

1.  Download the following Actian DX 9.5 container image file: Actian Digital Experience Docker container
2.  Follow these [deployment steps](../../../deployment/install/container/index.md) to deploy DX to supported Kubernetes platforms.
3.  Stage the content to the new environment to move from an existing system to Actian DX on Kubernetes platforms.

## Configure Actian DX Cloud Native 9.5 entitlement checks

Beginning with [Actian Digital Experience 9.5 Container Update CF207](../../../whatsnew/cf20/newcf207.md), you must specify certain entitlement check parameters in your [Actian Digital Experience Cloud Native 9.5 Tier 1 – 7](../../product_overview/offerings.md#actian-digital-experience-cloud-native) installations to accomplish entitlement checks with the Actian Software delivery portals. See [Actian Digital Experience Cloud Native 9.5 Entitlement Checks](../software_licensing_portal/configure_entitlement_checks/index.md) for more information.

???+ info "Related information"
    - [Locating and Downloading DX Products](../../access-software/locating-downloads.md)
