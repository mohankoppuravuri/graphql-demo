N = int(input())
B = [{
    "value": i,
    "next": [], 
    "min": None,
    "cost": None,
} for i in range(N+1)]

distance = {}
for i in range(1, N):
    x, y, d = map(int, input().split())
    B[min(x,y)]["next"].append(B[max(x,y)])
    distance[str(min(x, y)) + "-" + str(max(x,y))] = d
for i in range(1, N+1):
    cost, min = map(int, input().split())
    B[i]["cost"] = cost
    B[i]["min"] = min

B = B[1]

branches = []
def dfs (root, store):
    store.append(root)
    if len(root['next']) == 0:
        branches.append(store)    
        return None;
    for i in range(len(root['next'])):
        dfs(root['next'][i], [*store])

dfs(B, [])
# print(branches)
cost_memory = {}
final_cost = [];

for column in branches:
    column_length = len(column)
    for i in (column_length-2):
        specific = list(f'{i:{column_length-2}b}')
        

