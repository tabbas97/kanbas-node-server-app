import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // Required routes = create, retrievebyID, retrieveAll, update, delete
    // Create
    app.post("/api/assignments", (req, res) => {
        const assignment = { ...req.body, _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.send(assignment);
    });

    // Retrieve by ID
    app.get("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments.find((a) => a._id === id);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.send(assignment);
    });

    // Get Assignments by Course ID
    app.get("/api/assignments/course/:courseId", (req, res) => {
        console.log(req.params);
        const { courseId } = req.params;
        const assignments = Database.assignments.filter((a) => a.course === courseId);
        console.log(assignments);
        res.send(assignments);
    });

    // Retrieve All
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.send(assignments);
    });

    // Update
    app.put("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = req.body;
        Database.assignments = Database.assignments.map((a) =>
            a._id === id ? { ...a, ...assignment } : a
        );
        res.sendStatus(204);
    });

    // Delete
    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments.find((a) => a._id === id);
        if (!assignment) {
            res
                .status(404)
                .json({ message: `Unable to delete assignment with ID: ${id}` });
            return;
        }
        Database.assignments = Database.assignments.filter((a) => a._id !== id);
        res.sendStatus(204);
    });
}