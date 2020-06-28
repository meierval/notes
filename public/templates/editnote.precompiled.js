(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates['editnote'] = template({
    '1': function (container, depth0, helpers, partials, data) {
      return '!';
    },
    '3': function (container, depth0, helpers, partials, data) {
      return 'checked';
    },
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        alias3 = depth0 != null ? depth0 : container.nullContext || {},
        alias4 = container.hooks.helperMissing,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<form class="note editable" data-note-id="' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '">\n  <button type="button" class="importance editable">' +
        ((stack1 = (
          lookupProperty(helpers, 'times') ||
          (depth0 && lookupProperty(depth0, 'times')) ||
          alias4
        ).call(
          alias3,
          (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
            ? lookupProperty(stack1, 'importance')
            : stack1,
          {
            name: 'times',
            hash: {},
            fn: container.program(1, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 2, column: 52 }, end: { line: 2, column: 89 } },
          }
        )) != null
          ? stack1
          : '') +
        '</button>\n  <input\n          class="title editable"\n          type="text"\n          placeholder="Enter a title..."\n          minlength="2"\n          maxlength="70"\n          value="' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'title')
              : stack1,
            depth0
          )
        ) +
        '"\n          required\n  />\n  <div class="creation-date">' +
        alias2(
          (
            lookupProperty(helpers, 'formatDate') ||
            (depth0 && lookupProperty(depth0, 'formatDate')) ||
            alias4
          ).call(
            alias3,
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'creationDate')
              : stack1,
            {
              name: 'formatDate',
              hash: {},
              data: data,
              loc: { start: { line: 12, column: 29 }, end: { line: 12, column: 61 } },
            }
          )
        ) +
        '</div>\n  <div class="status">\n    <input type="checkbox" class="status editable" id="status-checkbox-' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '" ' +
        ((stack1 = lookupProperty(helpers, 'if').call(
          alias3,
          (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
            ? lookupProperty(stack1, 'isDone')
            : stack1,
          {
            name: 'if',
            hash: {},
            fn: container.program(3, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 14, column: 84 }, end: { line: 14, column: 117 } },
          }
        )) != null
          ? stack1
          : '') +
        ' />\n    <label for="status-checkbox-' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '"><span class="checkbox"></span></label>\n  </div>\n  <textarea\n          class="content editable"\n          id="content-' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '"\n          placeholder="Type something..."\n          minlength="1"\n          maxlength="700"\n          required\n  >' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'content')
              : stack1,
            depth0
          )
        ) +
        '</textarea>\n  <label class="finish-by-date"\n  >Finish by: <input class="editable" type="date" required value="' +
        alias2(
          (
            lookupProperty(helpers, 'formatDateForInput') ||
            (depth0 && lookupProperty(depth0, 'formatDateForInput')) ||
            alias4
          ).call(
            alias3,
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'toBeFinishedByDate')
              : stack1,
            {
              name: 'formatDateForInput',
              hash: {},
              data: data,
              loc: { start: { line: 26, column: 66 }, end: { line: 26, column: 112 } },
            }
          )
        ) +
        '"\n  /></label>\n  <button type="submit" class="save-button" id="save-button-' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '">\n    <svg xmlns="http://www.w3.org/2000/svg">\n      <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>\n    </svg></button>\n  <button type="button" class="cancel-button" id="cancel-button-' +
        alias2(
          alias1(
            (stack1 = depth0 != null ? lookupProperty(depth0, 'note') : depth0) != null
              ? lookupProperty(stack1, 'id')
              : stack1,
            depth0
          )
        ) +
        '">\n    <svg xmlns="http://www.w3.org/2000/svg">\n      <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>\n      <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>\n    </svg>\n  </button>\n</form>'
      );
    },
    useData: true,
  });
})();
