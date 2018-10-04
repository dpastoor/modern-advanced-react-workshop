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


## accessability

if you are changing the url, use a link, else use a button

empty links, like used in bootstrap, screw up accessibility


## snapshotting

```
getSnapshotBeforeUpdate allows us to do things before componentUpdating

if use this pattern then have an extra arg

// return value from getSnapshotBeforeUpdate is the 3rd arg (eg snapshot)
componentDidUpdate(prevProps, prevState, snapshot)
```

```
if (document.activeElement !== this.inputRef.current && document.activeElement !== this.contentRef.current) {
    return(true)
}
```

Good for focus and scroll position management

```
componentDidUpdate(pp, ps, userMovedFocus) {
    if (userMovedFocus) return // don't update focus if they're doing something else
    if (this.state.state == "idle") {
        this.inputRef.current.focus()
    } else {
        this.contentRef.current.focus()
    }

}
```