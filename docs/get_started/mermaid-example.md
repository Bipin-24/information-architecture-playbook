---
title: Mermaid Diagrams
---

# Mermaid Diagrams

Mermaid is a JavaScript-based diagramming tool that renders Markdown-inspired text definitions to create diagrams dynamically. It's already integrated into your documentation portal!

## Flowchart

```mermaid
flowchart TD
    Start([Start]) --> Input[/Input Data/]
    Input --> Process{Is Valid?}
    Process -->|Yes| Calculate[Calculate Result]
    Process -->|No| Error[Show Error]
    Calculate --> Output[/Display Output/]
    Output --> End([End])
    Error --> End
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Login Request
    Frontend->>API: POST /auth/login
    API->>Database: Validate Credentials
    Database-->>API: User Found
    API-->>Frontend: Auth Token
    Frontend-->>User: Login Success
```

## Class Diagram

```mermaid
classDiagram
    class User {
        +String username
        +String email
        +String password
        +login()
        +logout()
        +updateProfile()
    }
    
    class Product {
        +String name
        +Double price
        +String category
        +getDetails()
        +updatePrice()
    }
    
    class Order {
        +String orderId
        +Date orderDate
        +Double total
        +createOrder()
        +cancelOrder()
    }
    
    User "1" --> "*" Order : places
    Order "*" --> "*" Product : contains
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start Process
    Processing --> Success: Complete
    Processing --> Failed: Error Occurred
    Success --> [*]
    Failed --> Retry: User Retry
    Retry --> Processing
    Failed --> [*]: Give Up
```

## Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    CUSTOMER {
        string customer_id PK
        string name
        string email
        string phone
    }
    ORDER {
        string order_id PK
        string customer_id FK
        date order_date
        decimal total
    }
    PRODUCT {
        string product_id PK
        string name
        decimal price
        string category
    }
    ORDER_ITEM {
        string order_id FK
        string product_id FK
        int quantity
        decimal subtotal
    }
```

## Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
    Requirements Analysis    :done, req, 2024-01-01, 2024-01-15
    Design Phase             :done, design, 2024-01-16, 2024-02-01
    section Development
    Backend Development      :active, backend, 2024-02-02, 2024-03-15
    Frontend Development     :frontend, 2024-02-15, 2024-03-30
    section Testing
    Integration Testing      :testing, 2024-03-31, 2024-04-15
    UAT                      :uat, 2024-04-16, 2024-04-30
    section Deployment
    Production Deployment    :deploy, 2024-05-01, 2024-05-07
```

## Pie Chart

```mermaid
pie title Usage by Platform
    "Web" : 45
    "Mobile Android" : 30
    "Mobile iOS" : 20
    "Desktop App" : 5
```

## Git Graph

```mermaid
gitGraph
    commit id: "Initial commit"
    commit id: "Add authentication"
    branch develop
    checkout develop
    commit id: "Add user profile"
    commit id: "Add dashboard"
    checkout main
    merge develop
    branch feature/notifications
    checkout feature/notifications
    commit id: "Add email service"
    commit id: "Add push notifications"
    checkout main
    merge feature/notifications
    commit id: "Release v1.0"
```

## Journey Diagram

```mermaid
journey
    title User Shopping Journey
    section Browse
      Visit Website: 5: User
      Search Products: 4: User
      View Details: 4: User
    section Purchase
      Add to Cart: 3: User
      Review Cart: 3: User
      Checkout: 2: User, System
      Payment: 2: User, Payment Gateway
    section Post-Purchase
      Order Confirmation: 5: User, System
      Track Shipment: 4: User
      Receive Product: 5: User
```

## Mindmap

```mermaid
mindmap
  root((Data Intelligence Platform))
    Discovery
      Data Catalog
      Metadata Management
      Search & Browse
    Trust
      Data Quality
      Data Lineage
      Governance
    Activation
      AI Agents
      Automation
      Self-Service
    Integration
      APIs
      Connectors
      Webhooks
```

## Timeline

```mermaid
timeline
    title Platform Evolution
    2020 : Initial Release
         : Basic Catalog
    2021 : Enhanced Search
         : Data Lineage
         : Quality Checks
    2022 : AI Integration
         : Auto-tagging
         : Smart Recommendations
    2023 : Agentic AI
         : Self-service Analytics
         : Advanced Automation
    2024 : Enterprise Scale
         : Multi-tenant
         : Global Deployment
```

## Quadrant Chart

```mermaid
quadrantChart
    title Data Asset Prioritization
    x-axis Low Usage --> High Usage
    y-axis Low Quality --> High Quality
    quadrant-1 Optimize
    quadrant-2 Maintain
    quadrant-3 Retire
    quadrant-4 Improve
    Customer DB: [0.8, 0.9]
    Analytics Lake: [0.6, 0.7]
    Legacy System: [0.2, 0.3]
    Archive Storage: [0.1, 0.2]
    Real-time Stream: [0.7, 0.8]
```

## Syntax Tips

- Wrap Mermaid code in triple backticks with `mermaid` language identifier
- Use different diagram types by starting with keywords like `flowchart`, `sequenceDiagram`, `classDiagram`, etc.
- Mermaid renders directly in the browser using JavaScript
- For detailed syntax, visit the [official Mermaid documentation](https://mermaid.js.org/)

## Comparison: Mermaid vs PlantUML

| Feature | Mermaid | PlantUML |
|---------|---------|----------|
| Rendering | Client-side (JavaScript) | Server-side (Image) |
| Performance | Fast, no server needed | Requires external server |
| Diagram Types | 15+ types | 20+ types |
| Best For | Interactive docs, web | Complex enterprise diagrams |
| Customization | CSS-based | PlantUML themes |
