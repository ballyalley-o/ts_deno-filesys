const uuid = require('uuid')
let works = []

exports.getWork = (req, res, next) => {
  const workId = req.params.workId;

  const workIndex = works.findIndex((work) => {
    return work.id === workId;
  });
  const workBody = res.body;
  res.json({ message: "SUCCESSFUL", response: works[workIndex] });
};

exports.getWorks = (req, res, next) => {
    res.json({ message: "SUCCESSFUL", response: works})
}

exports.addWork = (req, res, next) => {
    const newWork = {
        // id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        id: uuid.v4().split('-')[0].toUpperCase(),
        job: req.body.job,
        department: req.body.department
    }
    works.push(newWork);
    res
        .status(201)
        .json({
            message: 'ADDING WORK SUCCESSFUL',
            response: newWork
        })
}

exports.updateWork = (req, res, next) => {
    const workId = req.params.workId;
    const workIndex = works.findIndex((work) => {
        return work.id === workId
    })
    works[workIndex] = {
        id: works[workIndex].id,
        job: works[workIndex].job,
        department: works[workIndex].department
    }
    res
        .status(201)
        .json({
            message: 'UPDATING WORK SUCCESSFUL'
        })
}

exports.deleteWork = (req, res, next) => {
    const workId = req.params.workId;
    works = works.filter(work => {
        work.id !== workId
    })
    res
        .status(200)
        .json({
            message: `WORK ${workId} DELETED`,
            response: {}
        })

}