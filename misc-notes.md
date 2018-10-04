# reach ui

`Rect` gives a renderProp pattern for when Rect changes it gives a callback

https://ui.reach.tech/rect

Rect can be handy with portals to make sure can place wher eyou want it.

```
<Rect>
({rect, ref}) => {
    <Portal>
    <ui style = {{
        left: rect.left,
         top: rect.top
     }}>
     ...
}
...
```