// backend/models/Expense.js
class Expense {
    constructor(id, userId, categoryId, amount, date, description) {
      this.id = id;
      this.userId = userId;
      this.categoryId = categoryId;
      this.amount = amount;
      this.date = date;
      this.description = description;
    }
  }
  
  module.exports = Expense;
  