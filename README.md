# Studying Angular version 21

---

#### Learned part 1 | march 7, 2026 : 12am

- interpolations
- components e.g generate using angular **command line** e.g `ng g c sample`
- importing the custom or generated component base on selector name e.g 'app-auth' then `<app-auth></app-auth/>`
- Adding string inside interpolation and transforming it to upper case e.g `{{"sample".toUpperCase()}}` or `{{100 === 100}}` as boolean.
- Buttons
- Inputs
- Functions
- Simple Get and set value
- Value templating e.g **button** or `<input #sampleTemplate (input)="onChange(sampleTemplate.value)"/>`
- Basic exercises to apply what I have learned e.g **simple counter app** and **simple calculator**.

---

#### Learned part 2 | march 7, 2026 : 6pm - 12am

- **Conditions** e.g `if else` using **directives** e.g `@if(...) {}`
- **Conditions** e.g `switch case` using **directives** e.g `@switch() { @case('sample') }`
- **For loop** e.g `for` using **directives** e.g `@for(variable of array; track variable) {}`
- **Signals** e.g `signal()` with signalType e.g `WritableSignal`,`Signal` or just `signal<string>("...")`.
- **Signal Fetch** e.g inside the construct of component. **fetch** is a reactive that catches any used signal changes to do something, e.g `API CALL`

---
