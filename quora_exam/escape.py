
import math


def make_guard(i, j, N):
    if (N == -1 or maze[i][j] == '@'): 
        return None;
    maze[i][j] = '@'
    make_guard(i-1, j, N-1)
    make_guard(i+1, j, N-1)
    make_guard(i, j-1, N-1)
    make_guard(i, j+1, N-1)
    
# N, M, K = map(int, input().split())
N = 10
M = 10
K = 2
maze = [
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '#', '.', '.', '.', 'E', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', 'S', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],   
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
       ]
start_row = 6
start_column = 2

end_row = 3
end_column = 8

# for i in range(N):
#     row = input().split()
#     for x in range(len(row)): 
#         if row[x] == 'S':
#             start_row = i
#             start_column = x
#         if row[x] == 'E':
#             end_row = i
#             end_column = x
#     maze.append(row)

# for i in range (K):
#     x, y, d = map(int, input().split())
#     make_guard(x-1, y-1, d)
make_guard(5, 6, 2)
make_guard(3, 3, 1)
def find_distance(i, j):
    if (maze[i][j] == '@' or maze[i][j] == '#'):
        return math.inf
    if (maze[i][j] == 'E'):
        return 0
    try:
        int(maze[i][j])
        return maze[i][j]
    except:
        maze[i][j] = '#'
        a = find_distance(i-1, j)
        b = find_distance(i+1, j)
        c = find_distance(i, j-1)
        d = find_distance(i, j+1)
        least = min(a, b, c, d)
        maze[i][j] = 1 + least;
        return 1 + least;
    
for row in maze:
  print(' '.join(map(str,row)))

res = ''
if maze[start_row][start_column] == '@' or maze[end_row][end_column] == '@':
    res = 'Impossible'
else:
    res = find_distance(start_row, start_column)
for row in maze:
  print(' '.join(map(str,row)))
print (res)