import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      if (state.expenseToUpdate) {
        const updatedExpenses = state.expenses.map((expense) => {
          if (expense.id === state.expenseToUpdate.id) {
            return {
              ...expense,
              text: payload.expense.text,
              amount: payload.expense.amount
            };
          }
          return expense;
        });
    
        return {
          expenses: updatedExpenses,
          expenseToUpdate: null
        };
      } else {
        return {
          expenses: [payload.expense, ...state.expenses],
          expenseToUpdate: null
        };
      }
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }

    case "SET_EXPENSE_TO_UPDATE":{
      return{
        ...state,
        expenseToUpdate:payload.expense,
      }
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const changeExpenseToUpdate = (expense)=>{
    dispatch({type:"SET_EXPENSE_TO_UPDATE", payload:{expense}})
  }

  

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense}
        expenseToUpdate={state.expenseToUpdate}
        changeExpenseToUpdate={changeExpenseToUpdate} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            expenseToUpdate={state.expenseToUpdate}
        changeExpenseToUpdate={changeExpenseToUpdate}

          />
        </div>
      </div>
    </>
  );
}

export default App;
