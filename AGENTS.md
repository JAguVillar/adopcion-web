# Pet Platform – Astro + Tailwind Design Brief

## Stack

- Framework: Astro
- Styling: Tailwind CSS
- No JS pesado en la landing (usar islas solo si es necesario)

## Product Goal

Web dedicada a mascotas con dos funcionalidades principales:

1. Adopción de mascotas
2. Lost & Found (mascotas perdidas/encontradas)

Ambas deben convivir sin confundir al usuario.

## Core UX Decisions

- Home con HERO SPLIT:
  - Izquierda → Adoption (verde pastel, emocional)
  - Derecha → Lost & Found (coral pastel, urgencia suave)
- El usuario entiende en 2 segundos qué puede hacer.
- Vista principal: List + Map
- Toggle Adopt / Lost & Found cambia:
  - dataset
  - copy
  - badges
  - CTA

## Visual Style

- Friendly, accesible, emocional
- Paleta pastel
- Mucho espacio en blanco
- Bordes redondeados grandes
- Sombras suaves
- Botones tipo pill

### Color intent (aprox)

- Green primary: #2EE59D / #DFF7EC
- Coral primary: #FF7D6E / #FFE8E5
- Background: #F6F7F7
- Text: #0F172A

## Pages

- Home
- Adoption (list + filters + detail)
- Lost & Found (list + map + report)
- Report a Pet
- How it works

## Components

- HeroSplit
- SearchTabs (Adopt / Lost & Found)
- PetCard
- Stats
- CTASection
- Footer

### PetCard rules

- Badge visible: Adopt / Lost / Found
- Lost & Found shows timestamp and location
- Buttons adapt to context (Adopt / Contact / Report)

## Definition of Done

- Home implementada con Astro + Tailwind
- Diseño muy similar a la referencia principal
- Responsive
- Datos mock
- Código limpio y semántico
