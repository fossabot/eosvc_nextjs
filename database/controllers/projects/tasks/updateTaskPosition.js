import Tasks from "../../../../model/Projects/Tasks";

export const updateTaskPosition = async (req, res) => {
  //console.log(req.body, "req.body updateTaskPosition");

  const resourceList = req.body.resourceList;
  const destinationList = req.body.destinationList;
  const resourceSectionId = req.body.resourceSectionId;
  const destinationSectionId = req.body.destinationSectionId;
  //console.log(resourceList, "resourceList");

  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();

  //console.log(resourceListReverse[key]._id, "resourceListReverse");
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Tasks.findByIdAndUpdate(resourceListReverse[key]._id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      await Tasks.findByIdAndUpdate(destinationListReverse[key]._id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
