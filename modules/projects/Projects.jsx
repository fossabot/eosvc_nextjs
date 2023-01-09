import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.value);

  return (
    <div className="w-full">
      <div>Projects</div>
    </div>
  );
};

export default Projects;
