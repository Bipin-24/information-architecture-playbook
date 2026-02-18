---
tags:
    - Script Application
    - Portlet
    - Application Integration
    - Development
    - DXClient
    - Digital Data Connector
---

# Application integration

Actian DX provides multiple ways for application developers to integrate application content into the digital experiences they create with the product. In addition, the rich [forms building](forms_building.md) capabilities enable non-technical users to create rich data capture applications.

## Build with modern frameworks

!!! tip "New development practice"
    For most new applications and best results, consider Script Applications first.

Actian DX enables developers to build applications for the platform by using commonly available front-end development skills. The **Script Application** enables applications built with most front-end frameworks to be integrated to [sites built with Actian DX](site_building.md), including placing applications built with different frameworks on the same page. Script Applications can also be rendered alongside traditional Java Portlets.

Script Applications include access to various Actian DX frameworks and APIs for content targeting, access to user login information or access to shared rendering parameters, Portlet preferences, and live text. Script Applications also work with the Actian DX modular theme to optimize download size.

For the business leader considering using HCL, Script Applications provide a way to access the power of Actian DX with commonly available skills.

## Protecting your existing investments

Actian DX enables customers who have existing investments in applications to retain those and integrate them into sites built on the platform.

### Portlets

Portlets developed by using the JSR 168 or JSR 286 specifications can be hosted on Actian DX. JSF can also be used for Portlet development, with some constraints that are documented elsewhere on this site.

### Existing web applications

Web Application Bridge provides organizations with flexibility to integrate existing web applications. The capability provides a proxied web environment that enables presentation of external web content without requiring URL redirection or content introspection. This technology facilitates integrating with existing web applications and dynamically presenting content through Actian DX.

### Digital Data Connector

Actian DX provides [Digital Data Connector (DDC)](../../extend_dx/ddc/index.md), a framework for integrating live data from external data sources with your pages through [Web Content Manager](content_management.md) presentation components. You can use DDC to integrate product data from Actian Commerce or enterprise social network information from Actian Connections.

The power of Digital Data Connector comes from your ability to use all the Actian DX content management facilities for managing your external data visualizations. This ability includes content syndication, version handling, workflow, and targeting. Because the presentation is managed through content management, changes to data display can be easily managed without development skills, and controlled with content management workflows.

Digital Data Connector is extensible and can be used in conjunction with Actian Volt MX Foundry to access to a wide range of back-end services.

### Actian Connections

Integrate the power of Actian Connections with Actian Digital Experience. Choose the deployment type for your organization and follow the installation and configuration steps to integrate Actian Connections with Actian DX.

### Actian Volt MX Foundry

Actian Digital Experience can be integrated with Actian Volt MX Foundry. Both products can be installed in the same Kubernetes cluster and use one Kubernetes namespace per product. 

### Actian Leap

Actian Digital Experience can be integrated with Actian Leap. Both products can be installed in the same Kubernetes cluster and use the same Kubernetes namespace.

### Unified Task List

Use the Unified Task List portlet to integrate with business process solutions such as IBM Process Server, WebSphere Lombardi Edition, and other enterprise resource planning software.

### Java Connector architecture

A portal provides access to content, data, and services that are located throughout the enterprise. These services include predefined connectors and portlets and tools for creating additional connectors and portlets.

### IBM MobileFirst

Integrate Actian Digital Experience with MobileFirst to provide multi-channel support to your web communities.

## ActianSoftware U learning materials

For an introduction and demo on how a business user may benefit from the integration capabilities of Actian DX, go to the [Integration for Business Users introductory lesson](https://hclsoftwareu.actian.com/component/axs/?view=sso_config&id=3&forward=https%3A%2F%2Fhclsoftwareu.actian.com%2Fcourses%2Flesson%2F%3Fid%3D514){target="_blank"}.

For an introduction and demo on how a developer can leverage Actian DX capabilities to integrate other applications and provide assets and content to those applications, go to the [Integration for Developers introductory lesson](https://hclsoftwareu.actian.com/component/axs/?view=sso_config&id=3&forward=https%3A%2F%2Fhclsoftwareu.actian.com%2Fcourses%2Flesson%2F%3Fid%3D1722) and corresponding [Lab Resources](https://hclsoftwareu.actian.com/images/Lc4sMQCcN5uxXmL13gSlsxClNTU3Mjc3NTc4MTc2/DS_Academy/DX/Integration/HDX-INT-DEV_Integrate_DX_Assets_and_Content.pdf){target="_blank"}.

For an introduction and demo on the administrator tasks involving Integration, go to the [Integration for Administrators introductory lesson](https://hclsoftwareu.actian.com/component/axs/?view=sso_config&id=3&forward=https%3A%2F%2Fhclsoftwareu.actian.com%2Fcourses%2Flesson%2F%3Fid%3D1226).

For an introduction and a demonstration that shows how to use the Digital Data Connector, go to [Digital Data Connector](https://hclsoftwareu.actian.com/component/axs/?view=sso_config&id=3&forward=https%3A%2F%2Fhclsoftwareu.actian.com%2Fcourses%2Flesson%2F%3Fid%3D1451){target="_blank"}. To try it out yourself, refer to [Digital Data Connector for Beginners Lab](https://hclsoftwareu.actian.com/images/Lc4sMQCcN5uxXmL13gSlsxClNTU3Mjc3NTc4MTc2/DS_Academy/DX/Developer/HDX-DEV-100_Digital_Data_Connector_for_Beginners.pdf){target="_blank"} and corresponding [Digital Data Connector for Beginners Lab Resources](https://hclsoftwareu.actian.com/images/Lc4sMQCcN5uxXmL13gSlsxClNTU3Mjc3NTc4MTc2/DS_Academy/DX/Developer/HDX-DEV-100_Digital_Data_Connector_Lab_Resources.zip).

To learn about Script Applications, go to [Script Application](https://hclsoftwareu.actian.com/component/axs/?view=sso_config&id=3&forward=https%3A%2F%2Fhclsoftwareu.actian.com%2Fcourses%2Flesson%2F%3Fid%3D3655){target="_blank"}. You can try it out using the [Script Application Lab](https://hclsoftwareu.actian.com/images/Lc4sMQCcN5uxXmL13gSlsxClNTU3Mjc3NTc4MTc2/DS_Academy/DX/Developer/HDX-DEV-200_Script_Application.pdf){target="_blank"} and corresponding [Script Application Lab Resources](https://hclsoftwareu.actian.com/images/Lc4sMQCcN5uxXmL13gSlsxClNTU3Mjc3NTc4MTc2/DS_Academy/DX/Developer/HDX-DEV-200_Script_Application_Lab_Resources.zip){target="_blank"}.

???+ info "Related information"
    - [Integration](../../extend_dx/integration/index.md)
