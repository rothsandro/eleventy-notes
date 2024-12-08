---
tags: [writing]
---

Callouts, also known as custom containers, admonitions, or alerts, are a way to highlight important information, warnings, or tips in your notes without disrupting the overall flow of your content.

## Creating a callout

Creating a callout is simple. Start a blockquote and add `[!info]` to the first line, where `info` is the type of the callout.

```md
> [!info]
> This is a callout.
```

> [!info]
> This is a callout.

## Changing the title

By default, the callout title is automatically set to match the callout type. However, you can customize this title to better suit your content.

To change the title, simply add your desired text after the callout type:

```md
> [!info] Custom Title Here
> This is the body of the callout.
```

> [!info] Custom Title Here
> This is the body of the callout.

In cases where you want to highlight a brief piece of information, you can create a callout with just a title and no body:

```md
> [!tip] Title-only Callout
```

> [!tip] Title-only Callout

## Foldable callouts

You can create foldable callouts, which can be expanded or collapsed by the reader. This feature is particularly useful when dealing with large amounts of information that you want to keep organized and easy to navigate.

To create a foldable callout, add a plus `+` or a minus `-` directly after the callout type. A plus sign (`+`) will make the callout expanded by default, while a minus sign (`-`) will make it collapsed by default.

```md
> [!info]- Callouts are foldable
> This is a callout that is collapsed by default.
```

> [!info]- Callouts are foldable
> This is a callout that is collapsed by default.

## Nested callouts

You can nest callouts in multiple levels.

> [!note] Nested callouts
>
> > [!tip] That's awesome!
> >
> > > [!example] Even deeply nested

## Supported types

You can use several callout types and aliases. Each type comes with a different background color and icon.

> [!abstract]-
>
> ```md
> > [!abstract]
> > Lorem ipsum
> ```

Alias: `summary`, `tldr`

---

> [!info]-
>
> ```md
> > [!info]
> > Lorem ipsum
> ```

---

> [!note]-
>
> ```md
> > [!note]
> > Lorem ipsum
> ```

---

> [!todo]-
>
> ```md
> > [!todo]
> > Lorem ipsum
> ```

---

> [!tip]-
>
> ```md
> > [!tip]
> > Lorem ipsum
> ```

Alias: `hint`, `important`

---

> [!success]-
>
> ```md
> > [!success]
> > Lorem ipsum
> ```

Alias: `check`, `done`

---

> [!question]-
>
> ```md
> > [!question]
> > Lorem ipsum
> ```

Alias: `help`, `faq`

---

> [!warning]-
>
> ```md
> > [!warning]
> > Lorem ipsum
> ```

Alias: `caution`, `attention`

---

> [!failure]-
>
> ```md
> > [!failure]
> > Lorem ipsum
> ```

Alias: `fail`, `missing`

---

> [!danger]-
>
> ```md
> > [!danger]
> > Lorem ipsum
> ```

Alias: `error`

---

> [!bug]-
>
> ```md
> > [!bug]
> > Lorem ipsum
> ```

---

> [!example]-
>
> ```md
> > [!example]
> > Lorem ipsum
> ```

---

> [!quote]-
>
> ```md
> > [!quote]
> > Lorem ipsum
> ```

Alias: `cite`
