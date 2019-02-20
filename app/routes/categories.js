module.exports = (app, url) => {
  const categories = ['months', 'entry_kinds', 'expense_categories'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const entryKinds = {
    I: 'Income',
    O: 'Outgoing',
    E: 'Expense',
  };
  const expenseCategories = {
    G: 'General',
    C: 'Culture',
    L: 'Leisure',
    E: 'Extras',
  };
  // api/pub/categories
  app.route(url).get((req, res) => {
    res.json(categories);
  });
  // api/pub/categories/count
  app.route(`${url}/count`).get((req, res) => {
    res.json({ count: categories.length });
  });
  // api/pub/categories/months ..."entry_kinds", "expense_categories"
  app.route(`${url}/:id`).get((req, res) => {
    switch (req.params.id) {
      case 'months':
        res.json(months);
        break;
      case 'entry_kinds':
        res.json(entryKinds);
        break;
      case 'expense_categories':
        res.json(expenseCategories);
        break;
      default:
        res.status(404).send();
    }
  });
};
