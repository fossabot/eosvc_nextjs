import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//setLoading(true);

export const createBoard = async (userId) => {
  console.log(userId, "userId");
  try {
    console.log("createBoard");
    /*
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/projects/boards", Option);
    const json = await response.json();
    return json;
    */
    //const res = await boardApi.create();
    //dispatch(setBoards([res]));
    //navigate(`/boards/${res.id}`);
  } catch (err) {
    //alert(err);
  } finally {
    //setLoading(false);
  }
};
