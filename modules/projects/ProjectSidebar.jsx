const ProjectSidebar = ({ boards }) => {
  console.log(boards, "boards componenta");
  return (
    <div>
      <h1 className="text-slate-900"> Projekty</h1>
      {boards?.map((board) => (
        <p key={board._id}>{board.title}</p>
      ))}
    </div>
  );
};

export default ProjectSidebar;
