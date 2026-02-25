---
title: Introduction to Zeenea Public APIs
description: Zeenea provides a set of public APIs that allow you to manage your catalog and its contents. The following section gives an overview of the availab...
---

# Introduction to Zeenea Public APIs

Zeenea provides a set of public APIs that allow you to manage your catalog and its contents. The following section gives an overview of the available APIs and the technologies they use.

## List of APIs

Zeenea provides the following APIs:

- **Exploration and mutation (GraphQL)**: Allows you to retrieve and edit any Item's documentation.
- **Catalog Design (GraphQL)**: Allows you to manage your catalog metamodel, Item types, and available properties. 
- **User Management (SCIM)**: Allows you to manage Users, Contacts, and Permission sets. 
- **Audit Trail API (REST)**: Allows you to track all Add, Update, and Delete events on all Items' metadata in your catalog. Items include Assets, Custom Items, Users, Contacts, and Permission sets. 
- **Data Product API (REST)**: Allows you to ingest and update data products and data contracts.
- **Access Request API (REST)**: Allows you to manage access requests.

For each API, dedicated documentation is available to help you understand its use cases, current limits, and some example requests.

For more information about the lifecycle of APIs, see [Zeenea API Lifecycle](./zeenea-api-lifecycle.md).

## API Key Authentication

To use the APIs, you must authenticate using an API key. Follow these steps to authenticate:

1. Create a new API key in Zeenea Administration. For detailed steps, see [Create an API key](../Zeenea_Administration/zeenea-managing-api-keys.md#create-an-api-key).
2. In your HTTP requests, add the following header: 

   `"X-API-SECRET": "$APISECRET"`
    
    Replace `$APISECRET` with the API secret that you retrieved when creating the key.

 
## Ingres SQL


```ingres-sql
exec sql begin declare section;
type
    Alpha = 'a'..'z';              {1 character}
    Packed_6 = packed array[1..6]
               of Char;            {6-char string}
    Vary_6 = varying[6] of Alpha;
var
    letter: Alpha;
    v_string : Vary_6;
exec sql end declare section;
```




## OpenRoad 4gl

```openroad-4gl
on event clicked =
declare
    i integer;
    s varchar(100);
enddeclare
begin
    callproc myproc(param := ::globalvar);
    message 'Button clicked';
end;
```


