// get visible expenses using filters
// getVisibleExpenses = (store) -> (expenses, filters) -> (expenses, {text, sortBy, startDate, endDate})
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter(({title, note, createdAt}) => {
        const startDateMatch = typeof startDate !== 'number' || createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || createdAt <= endDate;

        const searchText = text.trim().toLowerCase();
        const textMatch = typeof text !== 'string' || title.toLowerCase().includes(searchText)
            || note.toLowerCase().includes(searchText);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((expense_a, expense_b) => {
        if (sortBy === 'amount') return expense_a.amount - expense_b.amount;
        else if (sortBy === 'date') return expense_a.createdAt - expense_b.createdAt;
    });
};

export default getVisibleExpenses;