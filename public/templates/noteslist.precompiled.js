(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates['noteslist'] = template({
    '1': function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = 'function',
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '  <article class="note">\n    <div class="importance">' +
        ((stack1 = (
          lookupProperty(helpers, 'times') ||
          (depth0 && lookupProperty(depth0, 'times')) ||
          alias2
        ).call(alias1, depth0 != null ? lookupProperty(depth0, 'importance') : depth0, {
          name: 'times',
          hash: {},
          fn: container.program(2, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 3, column: 28 }, end: { line: 3, column: 60 } },
        })) != null
          ? stack1
          : '') +
        '</div>\n    <h2 class="title">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, 'title') || (depth0 != null ? lookupProperty(depth0, 'title') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'title',
                hash: {},
                data: data,
                loc: { start: { line: 4, column: 22 }, end: { line: 4, column: 31 } },
              })
            : helper)
        ) +
        '</h2>\n    <div class="creation-date">' +
        alias4(
          (
            lookupProperty(helpers, 'formatDate') ||
            (depth0 && lookupProperty(depth0, 'formatDate')) ||
            alias2
          ).call(alias1, depth0 != null ? lookupProperty(depth0, 'creationDate') : depth0, {
            name: 'formatDate',
            hash: {},
            data: data,
            loc: { start: { line: 5, column: 31 }, end: { line: 5, column: 58 } },
          })
        ) +
        '</div>\n    <div class="status">\n      <input type="checkbox" readonly class="status" id="status-checkbox-' +
        alias4(
          ((helper =
            (helper = lookupProperty(helpers, 'id') || (depth0 != null ? lookupProperty(depth0, 'id') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'id',
                hash: {},
                data: data,
                loc: { start: { line: 7, column: 73 }, end: { line: 7, column: 79 } },
              })
            : helper)
        ) +
        '" ' +
        ((stack1 = lookupProperty(helpers, 'if').call(
          alias1,
          depth0 != null ? lookupProperty(depth0, 'isDone') : depth0,
          {
            name: 'if',
            hash: {},
            fn: container.program(4, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 7, column: 81 }, end: { line: 7, column: 109 } },
          }
        )) != null
          ? stack1
          : '') +
        ' />\n      <label for="status-checkbox-' +
        alias4(
          ((helper =
            (helper = lookupProperty(helpers, 'id') || (depth0 != null ? lookupProperty(depth0, 'id') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'id',
                hash: {},
                data: data,
                loc: { start: { line: 8, column: 34 }, end: { line: 8, column: 40 } },
              })
            : helper)
        ) +
        '"><span class="checkbox"></span> </label>\n    </div>\n    <p class="content">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, 'content') || (depth0 != null ? lookupProperty(depth0, 'content') : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'content',
                hash: {},
                data: data,
                loc: { start: { line: 10, column: 23 }, end: { line: 10, column: 34 } },
              })
            : helper)
        ) +
        '</p>\n    <div class="finish-by-date">Finish by: ' +
        alias4(
          (
            lookupProperty(helpers, 'formatDate') ||
            (depth0 && lookupProperty(depth0, 'formatDate')) ||
            alias2
          ).call(alias1, depth0 != null ? lookupProperty(depth0, 'toBeFinishedByDate') : depth0, {
            name: 'formatDate',
            hash: {},
            data: data,
            loc: { start: { line: 11, column: 43 }, end: { line: 11, column: 76 } },
          })
        ) +
        '</div>\n    <button type="button" class="edit-button" data-note-id="' +
        alias4(
          ((helper =
            (helper = lookupProperty(helpers, 'id') || (depth0 != null ? lookupProperty(depth0, 'id') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'id',
                hash: {},
                data: data,
                loc: { start: { line: 12, column: 60 }, end: { line: 12, column: 66 } },
              })
            : helper)
        ) +
        '">\n      <svg xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>\n        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>\n      </svg>\n    </button>\n  </article>\n'
      );
    },
    '2': function (container, depth0, helpers, partials, data) {
      return '!';
    },
    '4': function (container, depth0, helpers, partials, data) {
      return 'checked';
    },
    '6': function (container, depth0, helpers, partials, data) {
      return '  No notes.\n';
    },
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        ((stack1 = lookupProperty(helpers, 'each').call(
          alias1,
          depth0 != null ? lookupProperty(depth0, 'notes') : depth0,
          {
            name: 'each',
            hash: {},
            fn: container.program(1, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 1, column: 0 }, end: { line: 19, column: 9 } },
          }
        )) != null
          ? stack1
          : '') +
        ((stack1 = lookupProperty(helpers, 'unless').call(
          alias1,
          (stack1 = depth0 != null ? lookupProperty(depth0, 'notes') : depth0) != null
            ? lookupProperty(stack1, 'length')
            : stack1,
          {
            name: 'unless',
            hash: {},
            fn: container.program(6, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 20, column: 0 }, end: { line: 22, column: 11 } },
          }
        )) != null
          ? stack1
          : '')
      );
    },
    useData: true,
  });
})();
