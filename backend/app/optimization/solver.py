from ortools.sat.python import cp_model
from app.schemas.schemas import PlanRequestSchema, PlanResponseSchema, TaskSchedule, ConflictSchema

def solve_plan(request: PlanRequestSchema) -> PlanResponseSchema:
    model = cp_model.CpModel()
    
    # Simple modeling
    horizon = request.horizon
    task_intervals = {}
    task_starts = {}
    task_ends = {}
    
    # Create variables
    for task in request.tasks:
        start = model.NewIntVar(0, horizon, f'start_{task.id}')
        end = model.NewIntVar(0, horizon, f'end_{task.id}')
        interval = model.NewIntervalVar(start, task.duration, end, f'interval_{task.id}')
        
        task_starts[task.id] = start
        task_ends[task.id] = end
        task_intervals[task.id] = interval

    # Resources (simplistic capacity modeling)
    # If all resources have capacity 1 (non-overlapping)
    # We use NoOverlap
    model.AddNoOverlap([task_intervals[t.id] for t in request.tasks])
    
    # Process constraints from the dynamic constraint system
    for c in request.constraints:
        if c.type == "dependency" and c.operator == "starts_after":
            # For this simple mock, we match names
            subject_task = next((t for t in request.tasks if t.name.lower() == c.subject.lower()), None)
            target_task = next((t for t in request.tasks if t.name.lower() == str(c.value).lower()), None)
            
            if subject_task and target_task:
                model.Add(task_starts[subject_task.id] >= task_ends[target_task.id])

    # Objective: Minimize makespan
    makespan = model.NewIntVar(0, horizon, 'makespan')
    for task in request.tasks:
        model.Add(task_ends[task.id] <= makespan)
    
    model.Minimize(makespan)
    
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        schedule = []
        for task in request.tasks:
            schedule.append(
                TaskSchedule(
                    task_id=task.id,
                    resource_id=request.resources[0].id if request.resources else "unassigned",
                    start=solver.Value(task_starts[task.id]),
                    end=solver.Value(task_ends[task.id]),
                    status="Scheduled",
                    explanation=[f"Scheduled successfully optimally"]
                )
            )
            
        return PlanResponseSchema(
            status="FEASIBLE",
            schedule=schedule,
            conflicts=[],
            objective_score=solver.ObjectiveValue(),
            utilization={}
        )
    else:
        return PlanResponseSchema(
            status="INFEASIBLE",
            schedule=[],
            conflicts=[ConflictSchema(message="Could not resolve constraints", suggestion="Relax constraints or add horizon")],
            objective_score=0,
            utilization={}
        )
