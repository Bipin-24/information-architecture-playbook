#!/usr/bin/env python3
import json

# Complete OpenAPI specification
spec = {
    "openapi": "3.0.1",
    "info": {
        "title": "Telmai Configuration API",
        "description": "Telmai configuration API: Sources, Policies, Rules, ...",
        "version": "25.1.4-dev2-356"
    },
    "servers": [
        {
            "url": "{telmai_host}/api/backend"
        }
    ],
    "security": [
        {
            "Authorization": [],
            "X-TLM-Key": []
        }
    ],
    "tags": [
        {"name": "Project APIs", "description": "APIs to manage projects inside a user tenant"},
        {"name": "Rules APIs", "description": "APIs to manage rules"},
        {"name": "Dashboards APIs", "description": "APIs to manage dashboards"},
        {"name": "Source Manage APIs", "description": "APIs to manage sources"},
        {"name": "Rule Templates APIs", "description": "APIs to manage rule templates"},
        {"name": "Tenant/Source TTL Manage APIs", "description": "APIs to manage TTL config of tenant and source"}
    ],
    "paths": {
        "/api/manage_ttl_config_tenant/{tenantId}": {
            "get": {
                "tags": ["Tenant/Source TTL Manage APIs"],
                "summary": "Get TTL config of tenant",
                "operationId": "getTTLConfigOfTenantUsingGET",
                "parameters": [
                    {"name": "tenantId", "in": "path", "description": "tenantId", "required": True, "schema": {"type": "string"}}
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {"application/json": {"schema": {"$ref": "#/components/schemas/TTLConfigDTO"}}}
                    }
                }
            },
            "put": {
                "tags": ["Tenant/Source TTL Manage APIs"],
                "summary": "Update TTL config of tenant",
                "operationId": "updateTTLConfigOfTenantUsingPUT",
                "parameters": [
                    {"name": "tenantId", "in": "path", "description": "tenantId", "required": True, "schema": {"type": "string"}}
                ],
                "requestBody": {
                    "content": {"application/json": {"schema": {"$ref": "#/components/schemas/TTLConfigDTO"}}},
                    "required": True
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {"application/json": {"schema": {"$ref": "#/components/schemas/TTLConfigDTO"}}}
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "TTLConfigDTO": {
                "type": "object",
                "properties": {
                    "ttl": {"type": "integer", "format": "int64"},
                    "tenantId": {"type": "string"},
                    "sourceId": {"type": "string"}
                }
            }
        },
        "securitySchemes": {
            "Authorization": {
                "type": "apiKey",
                "description": "Bearer token. Example value: Bearer <token>",
                "name": "Authorization",
                "in": "header"
            },
            "X-TLM-Key": {
                "type": "apiKey",
                "description": "API key for Telmai",
                "name": "X-TLM-Key",
                "in": "header"
            }
        }
    }
}

output_file = 'docs/APIs/telmai-configuration-api-spec.json'
with open(output_file, 'w') as f:
    json.dump(spec, f, indent=2)

print(f"✓ OpenAPI specification saved to {output_file}")
