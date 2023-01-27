import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Recipes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  console.log(user);
  return <div>MyFridge</div>;
};

export default Recipes;
