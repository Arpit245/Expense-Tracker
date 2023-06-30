import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, expenseToUpdate, changeExpenseToUpdate }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (expenseToUpdate) {
      expenseTextInput.current.value = expenseToUpdate.text;
      expenseAmountInput.current.value = expenseToUpdate.amount;
    }
  }, [expenseToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }
  
    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: expenseToUpdate ? expenseToUpdate.id : new Date().getTime()
    };
  
    if (expenseToUpdate) {
      addExpense(expense);
    } else {
      addExpense(expense);
    }
  
    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{expenseToUpdate ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        defaultValue={expenseToUpdate ? expenseToUpdate.text : ""}
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        defaultValue={expenseToUpdate ? expenseToUpdate.amount : ""}
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {expenseToUpdate ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
