---
tags: [writing, dynamic-content]
---

Queries allow you to filter, sort and manipulate data collections. Queries can be used on [[Collections]] provided by Eleventy Notes or any other list of objects you want to manipulate.

## Usage

Define a query in the front matter of a note and use the `query` filter to apply it to a list of objects.

```md
---
myQuery:
  filter: ... # see below
  sort: ... # see below
---

# My Notes

{{ collections.notes | query(myQuery) }}
```

## Query Properties

### Filtering

The `filter` property allows you to filter the data collection. The `filter` property is an array of filter rows. Each filter row is an array with three elements: the property to filter on, the operator and the value of the operator.

```yml
myQuery:
  filter:
    # A list of filter rows that must all match
    # Format: ["<property>", "<operator>", <value>]

    # Title must match the given RegEx pattern
    - ["title", "matches", "^Book:"]

      # Note must have the tag "book"
    - ["tags", "includes", "book"]
```

#### Operators

The following operators are available:

| Operator               | Description                                             |
| :--------------------- | :------------------------------------------------------ |
| `isEmpty`              | The property must be empty                              |
| `isNotEmpty`           | The property must not be empty                          |
| `isEqual`              | The property must be equal to the value                 |
| `isNotEqual`           | The property must not be equal to the value             |
| `isLessThan`           | The property must be less than the value                |
| `isLessThanOrEqual`    | The property must be less than or equal to the value    |
| `isGreaterThan`        | The property must be greater than the value             |
| `isGreaterThanOrEqual` | The property must be greater than or equal to the value |
| `includes`             | The property must include the value                     |
| `doesNotInclude`       | The property must not include the value                 |
| `includesAnyOf`        | The property must include any of the values             |
| `includesAllOf`        | The property must include all the values                |
| `includesNoneOf`       | The property must include none of the values            |
| `matches`              | The property must match the given RegEx pattern         |

#### And / Or

By default, all provided conditions must match. You can change this behavior by passing an object with either an `and` or `or` property. These objects can also be nested:

```yaml
myQuery:
  filter:
    or:
      # either condition must match
      - ["tags", "includes", "book"]
      - and:
          # both conditions must match
          - ["title", "matches", "^Book:"]
          - ["tags", "isEmpty"]
```

The example above filters all notes that have the tag `book` OR that have the title `Book:` AND no tags.

### Sorting

The `sort` property allows you to sort the data collection. The `sort` property is an array of sort rows. Each sort row is an array with two elements: the property to sort on and the sort direction.

```yml
myQuery:
  sort:
    # A list of sort rows
    # Format: ["<property>", "<direction>"]

    # Sort by the "sort" data property in ascending order
    - ["data.sort", "asc"]

    # Sort by the "title" property in descending order
    - ["title", "desc"]
```

### Tree

The `tree` property allows you to transform the data collection into a tree structure. The tree is created by a path property that is split on a separator.

```yml
myQuery:
  # Convert the collection into a tree
  tree: true

anotherQuery:
  tree:
    # The property that contains the path
    # default: filePathStem
    pathProp: "data.tree"

    # A list of path replacements (optional)
    replace:
      # Replace the "Demo/" prefix with an empty string
      "^/Demo/": ""
```

If `tree` is enabled, it will transform each item in the collection into a tree node. The tree node has the following properties:

```js
[
  {
    // A unique key for the node
    $treeKey: "my-folder--my-note",

    // The name of the current path segment
    $treeName: "My Note",

    // The list of child nodes
    children: [],

    // ... any existing properties of the item
  },
];
```

### Offset and Limit

The `offset` and `limit` properties allow you to limit the number of items returned by the query.

```yml
myQuery:
  # The number of items to skip
  offset: 10

  # The maximum number of items to return
  limit: 5
```
