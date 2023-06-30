import React, { useState } from "react";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

const Transaction = ({ expense, deleteExpense, changeExpenseToUpdate }) => {
  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);

  const handleEditClick = () => {
    changeExpenseToUpdate(expense);
  };

  return (
    <li
      key={expense.id}
      className={`${styles.transaction} ${
        expense.amount > 0 ? styles.profit : styles.loss
      }`}
      onMouseOver={() => {
        setCurrentHoverIndex(expense.id);
      }}
      onMouseLeave={() => {
        setCurrentHoverIndex(null);
      }}
    >
      <div>{expense.text}</div>
      <div className={styles.transactionOptions}>
        <div
          className={`${styles.amount} ${
            currentHoverIndex === expense.id && styles.movePrice
          }`}
        >
          ${expense.amount}
        </div>
        <div
          className={`${styles.btnContainer} ${
            currentHoverIndex === expense.id && styles.active
          }`}
        >
          <div className={styles.edit} onClick={handleEditClick}>
            <img src={EditImage} height="100%" alt="Edit" />
          </div>
          <div
            className={styles.delete}
            onClick={() => deleteExpense(expense.id)}
          >
            <img src={DeleteImage} height="100%" alt="Delete" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
