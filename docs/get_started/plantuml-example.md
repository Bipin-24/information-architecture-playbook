---
title: PlantUML Diagrams
---

# PlantUML Examples

PlantUML is now integrated into your documentation portal! You can create various types of diagrams using simple text syntax.

## Sequence Diagram

```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml
```

## Class Diagram

```plantuml
@startuml
class User {
  +String username
  +String email
  +login()
  +logout()
}

class Product {
  +String name
  +Double price
  +getDetails()
}

User "1" -- "*" Product : purchases
@enduml
```

## Activity Diagram

```plantuml
@startuml
start
:Initialize system;
if (Is user authenticated?) then (yes)
  :Load user dashboard;
else (no)
  :Show login page;
  :Authenticate user;
endif
:Display content;
stop
@enduml
```

## Component Diagram

```plantuml
@startuml
package "Frontend" {
  [Web UI]
  [Mobile App]
}

package "Backend" {
  [API Gateway]
  [Auth Service]
  [Data Service]
}

database "Database" {
  [PostgreSQL]
}

[Web UI] --> [API Gateway]
[Mobile App] --> [API Gateway]
[API Gateway] --> [Auth Service]
[API Gateway] --> [Data Service]
[Data Service] --> [PostgreSQL]
@enduml
```

## Use Case Diagram

```plantuml
@startuml
left to right direction
actor User
actor Admin

rectangle System {
  usecase "Login" as UC1
  usecase "View Dashboard" as UC2
  usecase "Manage Users" as UC3
  usecase "Generate Reports" as UC4
}

User --> UC1
User --> UC2
Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4
@enduml
```

## State Diagram

```plantuml
@startuml
[*] --> Idle
Idle --> Processing : Start
Processing --> Success : Complete
Processing --> Failed : Error
Success --> [*]
Failed --> Idle : Retry
@enduml
```

## Syntax Reference

- Wrap PlantUML code in triple backticks with `plantuml` language identifier
- Start diagrams with `@startuml` and end with `@enduml`
- Use arrows (`->`, `-->`, `<--`) for relationships
- Use `:` for labels and descriptions
- Use `|`, `{`, `}` for grouping and organization

For more PlantUML syntax examples, visit the [official PlantUML documentation](https://plantuml.com/).
